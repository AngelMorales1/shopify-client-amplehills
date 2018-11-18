import timekit from './utils/timekit';

module.exports = async (req, res) => {
  try {
    const app = await timekit.fetchAvailability();
    return res.end(JSON.stringify(app.data));
  } catch (e) {
    return res.end(e.message || 'Unknown Error');
  }
};
