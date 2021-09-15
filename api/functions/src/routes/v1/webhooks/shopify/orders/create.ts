import * as functions from 'firebase-functions';
import * as Sentry from '@sentry/node';
import access from 'access-control';
// import get from 'lodash/get';

import formatError from './../../../../../utils/formatError';
// import eventEmail from './../../../../../emails/event';

// import SendGrid from './../../../../../lib/sendgrid';

Sentry.init({ dsn: 'https://fce8c7e47cdd484d913ebdfc94801f33@sentry.io/1395390' });

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


const create = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;

  try {
    let { body } = req;
    
    body = typeof body === 'object' ? body : JSON.parse(body);

    console.log(body);

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

// const create = functions.https.onRequest(async (req, res) => {
//   if (cors(req, res)) return;

//   try {
//     let { body } = req;
    
//     body = typeof body === 'object' ? body : JSON.parse(body);

//     const to: string = get(body, 'email', '');
//     const id: string = get(body, 'id', '');
//     const title: string = get(body, 'title', '');
//     const datetime: string = get(body, 'datetime', '');
//     const calendarLink: string = 'https://google.com';
//     const directionsLink: string = 'https://www.google.com/maps/place/Ample+Hills+Creamery+Gowanus/@40.6789119,-73.9895145,17z/data=!3m1!5s0x89c25af8b7102a8d:0x7921739bc286da8!4m12!1m6!3m5!1s0x89c25a55b59c0bf5:0xce6ebe0b442e15db!2sAmple+Hills+Creamery+Gowanus!8m2!3d40.6789119!4d-73.9873258!3m4!1s0x89c25a55b59c0bf5:0xce6ebe0b442e15db!8m2!3d40.6789119!4d-73.9873258';

//     const email = {
//       from: 'events@amplehills.com',
//       to,
//       subject: `You're Going to ${title}`,
//       html: eventEmail({
//         id,
//         title,
//         datetime,
//         directionsLink,
//         calendarLink
//       })
//     };

//     SendGrid.send(email);

//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     });
//     return res.end(JSON.stringify({ status: 'ok' }));
//   } catch (e) {
//     Sentry.captureException(e);
//     res.writeHead((e && e.status) || 500, {
//       'Content-Type': 'application/json'
//     });
//     return res.end(JSON.stringify(formatError(e)));
//   }
// });

export default create;
