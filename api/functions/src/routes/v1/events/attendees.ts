import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
// import * as uuid from 'uuid';
// import admin from 'firebase-admin';
import access from 'access-control';
import get from 'lodash/get';

import formatError from './../../../utils/formatError';
// import Shopify from '../../../../../lib/shopify';
import db from './../../../lib/db';
import Shopify from './../../../lib/shopify';
// import eventEmail from './../../../../../emails/event';

// import SendGrid from './../../../../../lib/sendgrid';
// import Sanity from './../../../../../lib/sanity';

Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000',
    'http://localhost:3333',
    'https://ample-hills.sanity.studio',
    'https://ample-hills-creamery.sanity.studio',
    'https://ampletest.myshopify.com'
  ],
  methods: ['POST'],
  credentials: false
});

const attendees = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);

    const { name, variants, callerId } = body;

    console.log('NAME', name, callerId);
    console.log('VARIANTS', variants);

    if (callerId !== '2ec6b100-7e60-46f1-821d-2c39e2c1935d') {
      res.writeHead(403, {
        'Content-Type': 'application/json'
      });
      return res.end();
    }

    let ding: any = [];
    (await db.collection('eventAttendees').where('name', '==', name).get()).forEach(rec => {
      ding.push(rec.data());
    });
    console.log('DING', ding.length);
    ding.forEach((don: any) => console.log(don.variantName))

    const events: { [key: string]: any}= {};
    for (let i = 0; i < variants.length; i++) {
      events[variants[i] as string] = [];
      const records = await db.collection('eventAttendees')
        .where('name', '==', name)
        .where('variantName', '==', variants[i])
        .get();
  

      records.forEach((doc: any) => {
        const record = {
          _id: doc.id,
          ...doc.data()
          
        };
        events[variants[i]].push(record);
      });

      for (let j = 0; j < events[variants[i]].length; j++) {
        const record = events[variants[i]][j];
        if (record && record.orderId) {
          const order = await Shopify.fetchOrder(record.orderId);

          events[variants[i]][j] = {
            ...events[variants[i]][j],
            order
          };
        }
      }
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(events));
  } catch (e) {
    Sentry.captureException(e);

    console.log('EEEEE');
    console.error(e);

    res.writeHead((!!e && get(e, 'status')) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
});


export default attendees;
