import hashify from 'object-hash';

const Data = {
  cache: {
    getEntries: {},
    getProducts: {},
    fetchByHandle: {},
    getLocations: {},
    getGlobalSettings: {},
    getOurPledge: {}
  },
  setRef(clientID, client) {
    this[clientID] = client;
  },
  getEntries(type = 'page', handle) {
    const query = {
      content_type: type,
      include: 4,
      'fields.productHandle': handle
    };

    const hashified = hashify(query);

    if (!!this.cache.getEntries[hashified])
      return new Promise(resolve => resolve(this.cache.getEntries[hashified]));

    return this.contentful.getEntries(query).then(val => {
      this.cache.getEntries[hashified] = val;
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
      return new Promise(resolve => resolve(val));
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
  }
};

export default Data;
