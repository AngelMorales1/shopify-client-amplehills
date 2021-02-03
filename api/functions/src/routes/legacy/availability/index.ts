// This feature has been removed in the revamp, keeping around for legacy support


// const { parse } = require('url');
// const timekit = require('timekit-sdk');
// const access = require('access-control');
// const formatError = require('./utils/formatError');
// const Sentry = require('@sentry/node');

// Sentry.init({ dsn: 'https://fce8c7e47cdd484d913ebdfc94801f33@sentry.io/1395390' });

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