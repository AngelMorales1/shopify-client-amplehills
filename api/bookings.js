const timekit = require('timekit-sdk');
const access = require('access-control');
const formatError = require('./utils/formatError');
const { json } = require('micro');

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
    const {
      resource_id,
      graph,
      start,
      end,
      what,
      where,
      description,
      customer
    } = await json(req);
    const response = await timekit.createBooking({
      resource_id,
      graph,
      start,
      end,
      what,
      where,
      description,
      customer
    });
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
