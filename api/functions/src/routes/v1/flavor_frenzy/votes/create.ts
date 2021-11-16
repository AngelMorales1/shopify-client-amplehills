import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import access from 'access-control';
import * as Sentry from '@sentry/node';
import * as uuid from 'uuid';
import get from 'lodash/get';

import db from './../../../../lib/db';
import formatError from './../../../../utils/formatError';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000',
    'https://amplehills.com',
    'https://ampletest.myshopify.com'
  ],
  methods: ['POST'],
  credentials: false
});

export default functions.https.onRequest(async function(request, response) {
  if (cors(request, response)) return;

  try {
    const body = JSON.parse(request.body);
    const flavorFrenzy = get(body, 'flavorFrenzy');
    const round = get(body, 'round');
    const match = get(body, 'match');
    const flavor = get(body, 'flavor');

    if (!flavorFrenzy || !round || !match || !flavor) {
      response.writeHead(400, {
        'Content-Type': 'application/json'
      });
      return response.end(JSON.stringify('Required fields: flavorFrenzy, round, match, and flavor'));
    }

    const vote: admin.firestore.DocumentReference = await db.collection('votes').doc(uuid.v4());
    await vote.set({ flavorFrenzy, round, match, flavor });

    response.writeHead(201, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify(vote.id));
  } catch (e) {
    Sentry.captureException(e);
    response.writeHead((e && get(e, 'status')) || 500, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify(formatError(e)));
  }
});
