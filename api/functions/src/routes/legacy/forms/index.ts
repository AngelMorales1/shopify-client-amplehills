// This feature has been removed in the revamp, keeping around for legacy support

// const fetch = require('node-fetch');
// const Shopify = require('shopify-api-node');
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
//   KEY: '__HAS_SUBMITTED_FORMS__'
// };

// const FULFILLMENT_KEY = "Fulfillment";

// module.exports = async (req, res) => {
//   if (cors(req, res)) return;

//   try {
//     const shopify = new Shopify({
//       shopName: 'ampletest',
//       apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
//       password: process.env.SHOPIFY_ADMIN_PASSWORD
//     });

//     const { data, order_id } = await json(req);

//     /* Test to see if an adjustment has been made for this order */
//     const metafields = await shopify.metafield.list({
//       metafield: { owner_resource: 'order', owner_id: order_id }
//     });

//     const adjustment = metafields.find(({ namespace, key, value }) => {
//       return (
//         namespace === Metafield.NAMESPACE && 
//         key === Metafield.KEY &&
//         value === 1
//       );
//     });

//     /* If there's an adjustment already, return early */
//     if (adjustment) {
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       });
//       return res.end(JSON.stringify({ status: "already_completed" }));
//     }

//     /* We got here, so let's proceed */
//     if (Array.isArray(data)) {
//       await Promise.all(data.map(formData => {
//         const FORMBUCKET_ENDPOINT = 'https://api.formbucket.com/f/' + formData[FULFILLMENT_KEY];
//         return fetch(FORMBUCKET_ENDPOINT, {
//           method: 'post',
//           mode: 'cors',
//           headers: {
//             'accept' : 'application/javascript',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData)
//         });
//       }));
//     }

//     /* Mark this order as adjusted */
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
//     return res.end(JSON.stringify({ status: "ok" }));
//   } catch (e) {
//     Sentry.captureException(e);
//     res.writeHead((e && e.status) || 500, {
//       'Content-Type': 'application/json'
//     });
//     return res.end(JSON.stringify(formatError(e)));
//   }
// };