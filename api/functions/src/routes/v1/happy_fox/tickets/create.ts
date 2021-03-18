import fetch, { Headers } from 'node-fetch';
import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import access from 'access-control';
import get from 'lodash/get';

import formatError from './../../../../utils/formatError';

Sentry.init({ dsn: 'https://fce8c7e47cdd484d913ebdfc94801f33@sentry.io/1395390' });

const ENDPOINT = 'https://amplehillscreamery.happyfox.com/api/1.1/json/tickets';
const AUTH = Buffer.from(
  `${functions.config().happy_fox.api_key}:${functions.config().happy_fox.auth_code}`
).toString('base64');

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

const create_ticket = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);
    const category = get(body, 'category');
    const subject = get(body, 'subject');
    const name = get(body, 'name');
    const email = get(body, 'email');
    const phone = get(body, 'phone');
    const text = get(body, 'text');

    const data = {
      subject,
      text,
      name,
      email,
      category,
      priority: 3,

      primary_phone: {
        type: 'm',
        number: phone,
        id: 1
      },
      phones: [
        {
          type: 'm',
          number: phone,
          id: 1
        }
      ],

      // Ample Hills redundantly created required fields for their internal processes
      // These fields do not exist on the site and will be ignored.
      "t-cf-1": "Not provided",
      "t-cf-2": "Not provided",
      "t-cf-3": "Not provided",
      "t-cf-4": "Not provided",
      "t-cf-5": "Not provided",
      "t-cf-6": "Not provided",
      "t-cf-7": "Not provided",
      "t-cf-8": "Not provided",
      "t-cf-9": "Not provided"
    };
    console.log(data)
    console.log(AUTH)

    const ticket = await fetch(ENDPOINT, {
      method: 'post',
      headers: new Headers({
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    }).then(res => res.json());

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(ticket));
  } catch (e) {
    Sentry.captureException(e);
    res.writeHead((e && e.status) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
});

export default create_ticket;
