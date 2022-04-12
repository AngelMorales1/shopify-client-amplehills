import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import * as uuid from 'uuid';
import admin from 'firebase-admin';
import access from 'access-control';
import get from 'lodash/get';

import formatError from './../../../utils/formatError';
import Shopify from './../../../lib/shopify';
import db from './../../../lib/db';
// import eventEmail from './../../../../../emails/event';

// import SendGrid from './../../../../../lib/sendgrid';
import Sanity from './../../../lib/sanity';

Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000',
    'https://ampletest.myshopify.com',
    'https://ample-hills.sanity.studio',
    'https://ample-hills-creamery.sanity.studio',
    'http://localhost:3333'
  ],
  methods: ['POST'],
  credentials: false
});

const datetimeFromVariantTitle = (str: string) => {
  return new Date(Date.parse(str.split(',')[0]));
}

const create = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);

    console.log('BODY', body);

    const order = await Shopify.fetchOrder(body.id);
    const events = await Shopify.products.fetchEvents();

    console.log('ORDER', order);
    console.log('EVENTS', events);

    const eventsInOrder = order.line_items.filter(
      (item: any) => events.find((event: any) => event.title === item.title)
    );

    console.log('ORDER', order.line_items)
    console.log('EVENTS', events.map((event: any) => event.title));
    console.log('eventsinOrder', eventsInOrder);

    eventsInOrder.forEach(async (event: any) => {
      const sanityEvent: any = await Sanity.fetchEventByTitle(event.title);

      console.log('SANITY EVEBT',  sanityEvent.product.store.variants)

      if (!sanityEvent || !sanityEvent.name) {
        console.log('NO SANITY EVENT FOUND FOR EVENT');
        return;
      }

      const sanityVariant = sanityEvent.product?.store?.variants?.find((variant: any) => {
        return variant.store.title === event.variant_title
      });

      if (!sanityVariant) {
        console.log('NO SANITY VARIANT FOUND FOR EVENT');
        return;
      }

      console.log('PREPPING NEW DOC');
      const eventAttendee: admin.firestore.DocumentReference = await db.collection('eventAttendees').doc(uuid.v4());
      
      console.log(datetimeFromVariantTitle(sanityVariant.store.title));

      const newData = {
        orderId: body.id,
        name: event.title,
        variantName: event.variant_title,
        date: datetimeFromVariantTitle(sanityVariant.store.title)
      };
      console.log('SETTING NEW DOC DATA');
      console.table(newData);
      const setEvent = await eventAttendee.set(newData);

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
