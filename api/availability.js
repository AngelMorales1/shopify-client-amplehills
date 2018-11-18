const { parse } = require('url');
const timekit = require('timekit-sdk');
const formatError = require('./utils/formatError');

module.exports = async (req, res) => {
  try {
    timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

    const {
      query: { project_id }
    } = parse(req.url, true);

    const response = await timekit.fetchAvailability({ project_id });
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
