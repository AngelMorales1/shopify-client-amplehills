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
    'https://amplehills.com',
    'http://localhost:3000',
    'http://localhost:3333',
    'https://ample-hills.sanity.studio',
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
      console.time('AMPLE_HILLS_FF_FETCH');
      const matches: { [key: string]: number | string }[] = [];
      
      (await db.collection('totals').where('match', '!=', '').get()).forEach(doc => {
        matches.push({ _id: doc.id, ...doc.data() });
      });
      console.timeEnd('AMPLE_HILLS_FF_FETCH');

      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Credentials', 'true');
      response.setHeader(
        'Cache-Control',
        'max-age=0, s-maxage=300, stale-while-revalidate=300'
      );

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
