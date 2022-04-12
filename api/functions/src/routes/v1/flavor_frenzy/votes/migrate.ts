import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import access from 'access-control';
import * as uuid from 'uuid';
import get from 'lodash/get';
import * as Sentry from '@sentry/node';

import db from './../../../../lib/db';
import formatError from './../../../../utils/formatError';
import { FlavorFrenzyVote } from './../../../../types';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'https://amplehills.com',
    'http://localhost:3333',
    'https://ample-hills.sanity.studio',
    'https://ample-hills-creamery.sanity.studio',
    'http://localhost:3000',
    'https://ampletest.myshopify.com'
  ],
  methods: ['GET'],
  credentials: false
});

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '2GB'
};

export default functions
  .runWith(runtimeOpts)
  .https.onRequest(async function(request, response) {
    if (cors(request, response)) return;

    try {
      console.time('AMPLE_HILLS_FF_MIGRATE');
      const flavorFrenzy = request.query.id;
      const votes: FlavorFrenzyVote[] = [];
      
      (await db.collection('votes').where('flavorFrenzy', '==', flavorFrenzy).limit(500).get()).forEach(doc => {
        votes.push({
          _id: doc.id,
          _createdAt: doc.createTime.toDate(),
          ...doc.data()
        } as FlavorFrenzyVote);
      });

      const matches = votes.reduce(
        (matches: { [key: string]: { [key: string]: number }}, vote) => {
          const match = matches[vote.match];

          if (!match) matches[vote.match] = {};
          matches[vote.match][vote.flavor] = matches[vote.match][vote.flavor]
            ? matches[vote.match][vote.flavor] + 1
            : 1;

          return matches;
        },
        {}
      );

      Object.entries(matches).forEach(async ([matchId, flavors]) => {
        let match: undefined | { _id: string; };
        (await db.collection('totals').where('match', '==', matchId).get()).forEach(
          doc => match = { _id: doc.id, ...doc.data() }
        );

        if (match) {
          const totals = Object.entries(flavors).reduce(
            (totals: { [key: string]: number }, [flavorId, flavorTotal]) => {
              const previous = totals[flavorId];

              if (typeof previous !== 'number' && !!previous) return totals;

              totals[flavorId] = get(match, flavorId, 0) + flavorTotal;

              return totals;
            },
            {}
          );

          await db.collection('totals').doc(match._id).set({
            ...match,
            match: matchId,
            ...totals
          });
        } else {
          // Spread this so it doesn't erase data
          const newMatch: admin.firestore.DocumentReference = await db.collection('totals').doc(uuid.v4());
          await newMatch.set({ 
            match: matchId,
            ...flavors
          });
        }
      });

      votes.forEach(async vote => {
        await db.collection('votes').doc(vote._id).delete();
      });

      console.timeEnd('AMPLE_HILLS_FF_MIGRATE');

      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      return response.end(JSON.stringify(matches));
    } catch (e) {
      Sentry.captureException(e);
      response.writeHead((e && get(e, 'status')) || 500, {
        'Content-Type': 'application/json'
      });
      return response.end(JSON.stringify(formatError(e)));
    }
  }
);
