import fetch from 'node-fetch';
import { request } from 'graphql-request';

import Gql from './Shopify/gql';
import Serializers from './Shopify/serializers';
import { Product } from './../types';

const Shopify = {
  products: {
    fetchEvents: async function(): Promise<Product[]> {
      // TO-DO: Create a makeRequest function to wrap this
      try {
        const products = await request('https://ampletest.myshopify.com/api/2021-10/graphql.json', Gql.products, undefined, {
          'X-Shopify-Storefront-Access-Token': 'b87a1b888ce7ee3394e288497ba76914'
        });
        return Serializers.products.fetchEvents(products);
      } catch (e) {
        console.error('ww', e);
      }

      return [];
    }
  },
  fetchOrder: async function(id: string): Promise<any> {
    // TO-DO: Create a makeRequest function to wrap this
    try {
      const order = await fetch(`https://ampletest.myshopify.com/admin/api/2021-10/orders/${id}.json`, {
        headers: {
          'X-Shopify-Access-Token': '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'
        }
      }).then(res => res.json());
      return Serializers.orders.fetch(order);
    } catch (e) {
      console.error('ww', e);
    }

    return [];
  }
}

export default Shopify;

