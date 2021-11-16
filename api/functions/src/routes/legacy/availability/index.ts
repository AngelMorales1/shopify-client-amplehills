// This feature has been removed in the revamp, keeping around for legacy support


// const { parse } = require('url');
// const timekit = require('timekit-sdk');
// const access = require('access-control');
// const formatError = require('./utils/formatError');
// const Sentry = require('@sentry/node');

// Sentry.init({ dsn: "https://2d4cc299ad4b4fc889aa333c99653eef@o1059639.ingest.sentry.io/6048443" });

// const cors = access({
//   origins: [
//     'https://www.amplehills.com',
//     'https://staging.amplehills.com',
//     'http://localhost:3000'
//   ],
//   methods: ['GET'],
//   credentials: false
// });

// module.exports = async (req, res) => {
//   if (cors(req, res)) return;

//   try {
//     timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

//     const {
//       query: { project_id, to }
//     } = parse(req.url, true);

//     const response = await timekit.fetchAvailability({ project_id, to });
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