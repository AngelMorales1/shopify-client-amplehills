import hashify from 'object-hash';

const Data = {
  cache: {
    getEntries: {},
    fetchProducts: {},
    fetchContentfulProducts: {},
    fetchProductLanding: {},
    fetchByHandle: {},
    getLocations: {},
    getGlobalSettings: {},
    getOurPledge: {}
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
  },
  fetchContentfulProducts() {
    const query = {
      content_type: 'productPage',
      include: 4
    };

    const hashified = hashify(query);

    if (this.cache.fetchContentfulProducts[hashified])
      return new Promise(resolve =>
        resolve(this.cache.fetchContentfulProducts[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.fetchContentfulProducts[hashified] = val;
      return val;
    });
  },
  fetchProductLanding() {
    const query = {
      content_type: 'productLanding'
    };

    const hashified = hashify(query);

    if (!!this.cache.fetchProductLanding[hashified])
      return new Promise(resolve =>
        resolve(this.cache.fetchProductLanding[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.fetchProductLanding[hashified] = val;
      return val;
    });
  },
  fetchByHandle(handle) {
    const hashified = hashify(handle);

    if (this.cache.fetchByHandle[hashified])
      return new Promise(resolve =>
        resolve(this.cache.fetchByHandle[hashified])
      );

    return this.shopify.product.fetchByHandle(handle).then(val => {
      this.cache.fetchByHandle[hashified] = val;
      return val;
    });
  },
  getLocations() {
    const query = {
      content_type: 'locations'
    };

    const hashified = hashify(query);

    if (!!this.cache.getLocations[hashified])
      return new Promise(resolve =>
        resolve(this.cache.getLocations[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.getLocations[hashified] = val;
      return val;
    });
  },
  getGlobalSettings() {
    const query = {
      content_type: 'globalSettings'
    };

    const hashified = hashify(query);

    if (!!this.cache.getGlobalSettings[hashified])
      return new Promise(resolve =>
        resolve(this.cache.getGlobalSettings[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.getGlobalSettings[hashified] = val;
      return val;
    });
  },
  getOurPledge() {
    const query = {
      content_type: 'ourPledge'
    };

    const hashified = hashify(query);

    if (!!this.cache.getOurPledge[hashified])
      return new Promise(resolve =>
        resolve(this.cache.getOurPledge[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.getOurPledge[hashified] = val;
      return val;
    });
  },
  getProductLanding() {
    const query = {
      content_type: 'productLanding'
    };

    const hashified = hashify(query);

    if (!!this.cache.getProductLanding[hashified])
      return new Promise(resolve =>
        resolve(this.cache.getProductLanding[hashified])
      );

    return this.contentful.getEntries(query).then(val => {
      this.cache.getProductLanding[hashified] = val;
      return val;
    });
  }
};

export default Data;
