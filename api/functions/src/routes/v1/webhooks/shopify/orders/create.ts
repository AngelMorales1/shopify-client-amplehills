import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import * as uuid from 'uuid';
import admin from 'firebase-admin';
import access from 'access-control';
import get from 'lodash/get';

import formatError from './../../../../../utils/formatError';
import Shopify from '../../../../../lib/shopify';
import db from './../../../../../lib/db';
// import eventEmail from './../../../../../emails/event';

// import SendGrid from './../../../../../lib/sendgrid';
import Sanity from './../../../../../lib/sanity';

Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'https://amplehills.com',
    'http://localhost:3000',
    'https://ampletest.myshopify.com',
    'https://ample-hills-creamery.sanity.studio',
    'https://ample-hills.sanity.studio',
    'http://localhost:3333'
  ],
  methods: ['POST'],
  credentials: false
});


const create = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);

    const events = await Shopify.products.fetchEvents();
    const eventsInOrder = body.line_items.filter(
      (item: any) => events?.find(event => event.title === item.title)
    );

    if (!!eventsInOrder && !!eventsInOrder.length) {
      console.log(`${eventsInOrder.length} event(s) found in order.`)
    } else {
      console.log('NO EVENTS IN ORDER')
    }

    eventsInOrder.forEach(async (event: any) => {
      const sanityEvent = await Sanity.fetchEventByTitle(event.title);
      if (!sanityEvent) {
        console.log('NO SANITY EVENT FOUND FOR EVENT');
        return;
      }

      const sanityVariant = sanityEvent.variants?.find((variant: any) => {
        console.log(variant.shopifyName, event.variant_title)
        return variant.shopifyName === event.variant_title
      });

      if (!sanityVariant) {
        console.log('NO VARIANT FOUND FOR EVENT')
        return;
      }

      const eventAttendee: admin.firestore.DocumentReference = await db.collection('eventAttendees').doc(uuid.v4());
      const setEvent = await eventAttendee.set({
        orderId: body.id,
        name: event.title,
        variantName: event.variant_title,
        date: sanityVariant.datetime
      });

      const eventLocation = sanityEvent.location;
      console.log('SANITY', eventLocation, setEvent);
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify({ status: 'ok' }));
  } catch (e) {
    Sentry.captureException(e);
    res.writeHead((!!e && get(e, 'status')) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
});

export default create;
