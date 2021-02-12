import * as functions from 'firebase-functions';
import access from 'access-control';
import * as Sentry from '@sentry/node';

import db from './../../../../lib/db';
import formatError from './../../../../utils/formatError';
import { FlavorFrenzyVote } from './../../../../types';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000',
    'https://ampletest.myshopify.com'
  ],
  methods: ['GET'],
  credentials: false
});

export default functions.https.onRequest(async function(request, response) {
  if (cors(request, response)) return;

  try {
    const votes: FlavorFrenzyVote[] = [];
    
    (await db.collection('votes').get()).forEach(doc => {
      votes.push({
        _id: doc.id,
        _createdAt: doc.createTime.toDate(),
        ...doc.data()
      } as FlavorFrenzyVote);
    });

    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify(votes));
  } catch (e) {
    Sentry.captureException(e);
    response.writeHead((e && e.status) || 500, {
      'Content-Type': 'application/json'
    });
    return response.end(JSON.stringify(formatError(e)));
  }
});
