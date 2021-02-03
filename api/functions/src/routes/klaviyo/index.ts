import fetch from 'node-fetch';
import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import access from 'access-control';

import formatError from './../../utils/formatError';

Sentry.init({ dsn: 'https://fce8c7e47cdd484d913ebdfc94801f33@sentry.io/1395390' });
const KLAVIYO_ENDPOINT = 'https://a.klaviyo.com/api/v2/list/SrNKwg/subscribe';

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000',
    'https://ampletest.myshopify.com'
  ],
  methods: ['POST'],
  credentials: false
});

const klaviyo = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    const { email } = req.body;

    const body = {
      api_key: functions.config().klaviyo.api_key,
      profiles: [{ email }]
    };

    await fetch(KLAVIYO_ENDPOINT, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify({ status: 'ok' }));
  } catch (e) {
    Sentry.captureException(e);
    res.writeHead((e && e.status) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
});

export default klaviyo;
