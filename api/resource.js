const { parse } = require('url');
const timekit = require('timekit-sdk');

module.exports = async (req, res) => {
  try {
    timekit.configure({ appKey: process.env.TIMEKIT_API_KEY });

    const { query } = parse(req.url, true);
    const response = await timekit.getResource({ id: query.id });
    return res.end(JSON.stringify(response.data));
  } catch (e) {
    return res.end((e && e.message) || 'Unknown Error');
  }
};
