import get from 'lodash/get';

import { Product } from 'types';

const emptyArr: any[] = [];
const emptyObj = {};

const Serializers = {
  products: {
    fetch: (response: unknown): Product[] => {
      const edges: unknown[] = get(response, 'products.edges', emptyArr);
      const products = edges.map(edge => {
        const node: unknown = get(edge, 'node', emptyObj);
        const title = get(node, 'title', '');
        const productType = get(node, 'productType', '');
        // const imageEdges = get(node, 'images', []);
        // const imageNodes = get(edges)

        return { title, productType }
      });

      return products;
    },
    fetchEvents: (response: unknown): Product[] => {
      const edges: unknown[] = get(response, 'products.edges', emptyArr);
      const products = edges.map(edge => {
        const node: unknown = get(edge, 'node', emptyObj);
        const id = get(node, 'id', '');
        const title = get(node, 'title', '');
        const productType = get(node, 'productType', '');
        // const imageNodes = get(edges)

        return { id, title, productType }
      });

      return products;
    },
  },
  orders: {
    fetch: (response: unknown): any => {
      const order = get(response, 'order', emptyObj);

      return order;
    }
  }
}

export default Serializers;
