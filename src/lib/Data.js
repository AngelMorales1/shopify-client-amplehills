import hashify from "object-hash";
import { SHOPIFY, CONTENTFUL } from "constants/Clients";

const Data = {
  cache: {
    getEntries: {},
    getProducts: {},
    getProduct: {}
  },
  setRef(clientID, client) {
    this[clientID] = client;
  },
  getEntries(type = "page", handle) {
    const query = {
      content_type: type,
      include: 4,
      "fields.productHandle": handle
    };

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
