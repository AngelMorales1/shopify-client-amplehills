const { parse } = require('url');

// method, url, domain, headers
module.exports = async (req, res) => {
  const { query } = parse(req, url, true);
  return res.end(JSON.stringify(Object.keys(req)));
};
