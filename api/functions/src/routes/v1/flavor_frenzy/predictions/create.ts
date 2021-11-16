import fetch from 'node-fetch';
import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import access from 'access-control';
import get from 'lodash/get';

import formatError from './../../../../utils/formatError';

Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });
const KLAVIYO_ENDPOINT = 'https://a.klaviyo.com/api/v2/list/WW9nrp/subscribe';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'https://amplehills.com',
    'http://localhost:3000',
    'https://ampletest.myshopify.com'
  ],
  methods: ['POST'],
  credentials: false
});

const klaviyo = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);

    const email = get(body, 'email');
    const prediction = get(body, 'prediction');

    const data = {
      api_key: functions.config().klaviyo.api_key,
      profiles: [{ email, prediction }]
    };

    await fetch(KLAVIYO_ENDPOINT, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify({ status: 'ok' }));
  } catch (e) {
    Sentry.captureException(e);
    res.writeHead((e && get(e, 'status')) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
});

export default klaviyo;
