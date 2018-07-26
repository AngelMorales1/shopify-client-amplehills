import hashify from 'object-hash';

const Data = {
  cache: {
    getEntries: {}
  },
  setRef(clientID, client) {
    this[clientID] = client;
  },
  getEntries(query) {
    const hashified = hashify(query);

    if (!!this.cache.getEntries[hashified])
      return new Promise(resolve => resolve(this.cache.getEntries[hashified]));

    return this.contentful.getEntries(query).then(val => {
      this.cache.getEntries[hashified] = val;
      return val;
    });
  }
};

export default Data;
