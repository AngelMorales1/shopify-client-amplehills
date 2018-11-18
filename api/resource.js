module.exports = async (req, res) => {
  return res.end(JSON.stringify(Object.keys(req)));
};
