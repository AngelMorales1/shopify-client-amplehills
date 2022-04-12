import * as functions from 'firebase-functions';
import access from 'access-control';
import * as Sentry from '@sentry/node';
import get from 'lodash/get';

import db from './../../../../lib/db';
import formatError from './../../../../utils/formatError';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3333',
    'https://amplehills.com',
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
      console.time('AMPLE_HILLS_FF_TOTAL');
      const votes: any[] = [];
      const flavorFrenzy = request.query.id;
      
      (await db.collection('votes').where('flavorFrenzy', '==', flavorFrenzy).get()).forEach(doc => {
        votes.push(doc);
      });
      console.timeEnd('AMPLE_HILLS_FF_TOTAL');

      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      return response.end(JSON.stringify(votes.length));
    } catch (e) {
      Sentry.captureException(e);
      response.writeHead((e && get(e, 'status')) || 500, {
        'Content-Type': 'application/json'
      });
      return response.end(JSON.stringify(formatError(e)));
    }
  }
);
