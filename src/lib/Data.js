import hashify from 'object-hash';

const Data = {
  cache: {
    getEntries: {},
    fetchProducts: {}
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
  },
  fetchProducts() {
    const hashified = hashify('fetchAll');

    if (this.cache.fetchProducts[hashified])
      return new Promise(resolve =>
        resolve(this.cache.fetchProducts[hashified])
      );

    return this.shopify.product.fetchAll().then(val => {
      this.cache.fetchProducts[hashified] = val;
      return val;
    });
  }
};

export default Data;
