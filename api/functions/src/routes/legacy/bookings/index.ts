// This feature has been removed in the revamp, keeping around for legacy support

// const Shopify = require('shopify-api-node');
// const timekit = require('timekit-sdk');
// const Sentry = require('@sentry/node');

// const access = require('access-control');
// const formatError = require('./utils/formatError');
// const { json } = require('micro');

// Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });

// const cors = access({
//   origins: [
//     'https://www.amplehills.com',
//     'https://staging.amplehills.com',
//     'http://localhost:3000',
//     'https://ampletest.myshopify.com'
//   ],
//   methods: ['POST'],
//   credentials: false
// });

// const Metafield = {
//   NAMESPACE: 'ample_hills',
//   KEY: '__HAS_MADE_BOOKING__'
// };

// module.exports = async (req, res) => {
//   if (cors(req, res)) return;

//   try {
//     timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

//     const shopify = new Shopify({
//       shopName: 'ampletest',
//       apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
//       password: process.env.SHOPIFY_ADMIN_PASSWORD
//     });

//     const {
//       order_id,
//       resource_id,
//       graph,
//       start,
//       end,
//       what,
//       where,
//       description,
//       customer
//     } = await json(req);

//     /* Test to see if a booking has already been made for this order */
//     const metafields = await shopify.metafield.list({
//       metafield: { owner_resource: 'order', owner_id: order_id }
//     });

//     const bookingMade = metafields.find(({ namespace, key, value }) => {
//       return (
//         namespace === Metafield.NAMESPACE && 
//         key === Metafield.KEY &&
//         value === 1
//       );
//     });

//     /* If there's a booking already, return early */
//     if (bookingMade) {
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       });
//       return res.end(JSON.stringify({ status: "already_completed" }));
//     }

//     /* We got here, so let's proceed */
//     const response = await timekit.createBooking({
//       resource_id,
//       graph,
//       start,
//       end,
//       what,
//       where,
//       description,
//       customer
//     });

//     /* Mark this booking as adjusted */
//     await shopify.metafield.create({
//       key: Metafield.KEY,
//       value: 1,
//       value_type: 'integer',
//       namespace: Metafield.NAMESPACE,
//       owner_resource: 'order',
//       owner_id: order_id,
//     });

//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     });
//     return res.end(JSON.stringify(response.data));
//   } catch (e) {
//     Sentry.captureException(e);
//     res.writeHead((e && e.status) || 500, {
//       'Content-Type': 'application/json'
//     });
//     return res.end(JSON.stringify(formatError(e)));
//   }
// };
