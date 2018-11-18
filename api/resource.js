import timekit from './utils/timekit';

module.exports = async (req, res) => {
  return res.end(JSON.stringify(req));

  try {
    const app = await timekit.fetchAvailability();
    return res.end(JSON.stringify(app.data));
  } catch (e) {
    return res.end(e.message || 'Unknown Error');
  }
};
