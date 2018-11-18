const { parse } = require('url');
const timekit = require('timekit-sdk');

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
    return res.end(JSON.parse(Object.keys(e)));
    //return res.end((e && e.message) || 'Unknown Error');
  }
};
