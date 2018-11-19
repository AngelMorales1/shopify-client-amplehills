var objectValues = require('./objectValues');

module.exports = function getPolyfill() {
  if (typeof Object.values !== 'function') {
    return (Object.values = objectValues);
  }
};
