import * as functions from 'firebase-functions';
// import admin from 'firebase-admin';
import access from 'access-control';
import * as Sentry from '@sentry/node';
import get from 'lodash/get';

import db from './../../../../lib/db';
import formatError from './../../../../utils/formatError';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'https://amplehills.com',
    'http://localhost:3333',
    'https://ample-hills.sanity.studio',
    'http://localhost:3000',
    'https://ampletest.myshopify.com'
  ],
  methods: ['POST'],
  credentials: false
});

export default functions.https.onRequest(async function(request, response) {
  if (cors(request, response)) return;

  try {
    let { body } = request;
    
    body = typeof body === 'object' ? body : JSON.parse(body);
    const matchData = get(body, 'match');
    const matchId = get(matchData, 'match');

    let remoteMatch: undefined | { _id: string; };
    (await db.collection('totals').where('match', '==', matchId).get()).forEach(
      doc => remoteMatch = { _id: doc.id, ...doc.data() }
    );

    if (remoteMatch) {
      await db.collection('totals').doc(remoteMatch._id).set({
        ...remoteMatch,
        match: matchId,
        ...matchData
      });
    }

    response.writeHead(201, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify({ matchData, remoteMatch }));
  } catch (e) {
    Sentry.captureException(e);
    response.writeHead((e && get(e, 'status')) || 500, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify(formatError(e)));
  }
});
