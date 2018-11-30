const timekit = require('timekit-sdk');
const access = require('access-control');
const formatError = require('./utils/formatError');

const cors = access({
  origins: [
    'https://www.amplehills.com',
    'https://staging.amplehills.com',
    'http://localhost:3000'
  ],
  methods: ['POST'],
  credentials: false
});

module.exports = async (req, res) => {
  if (cors(req, res)) return;

  try {
    timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

    return res.end(JSON.stringify(req.body));

    const response = await timekit.createBooking(JSON.parse(req.body));
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(response.data));
  } catch (e) {
    res.writeHead((e && e.status) || 500, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify(formatError(e)));
  }
};
