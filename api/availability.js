const { parse } = require('url');
const timekit = require('timekit-sdk');
const formatError = require('./utils/formatError');

module.exports = async (req, res) => {
  try {
    timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

    const {
      query: { id, from, to, length }
    } = parse(req.url, true);

    const response = await timekit.fetchAvailability({
      resources: [id],
      from,
      to,
      length
    });

    return res.end(JSON.stringify(response.data));
  } catch (e) {
    try {
      return res
        .status((e && e.status) || 500)
        .end(JSON.stringify(formatError(e)));
    } catch (e) {
      return res.end(e.message);
    }
  }
};
