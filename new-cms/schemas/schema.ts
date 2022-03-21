import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import flavor from './flavor';
import location from './location';
import event from './event';
import page from './page';
import product from './product';
import flavorFrenzy from './flavorFrenzy';
import inStores from './inStores';
import retailLocation from './retailLocation';
import retailLocationTag from './retailLocationTag';
import distributor from './distributor';
import settings from './settings';

import eventVariant from './subschemas/eventVariant';

import productVariant from './productVariant';
import shopifyProduct from './subschemas/shopifyProduct';
import shopifyProductVariant from './subschemas/shopifyProductVariant';
import productOption from './subschemas/productOption';
import productWithVariant from './subschemas/productWithVariant';

import proxyString from './subschemas/proxyString';
import placeholderString from './subschemas/placeholderString';


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Documents
    flavor,
    flavorFrenzy,
    inStores,
    retailLocation,
    retailLocationTag,
    distributor,
    location,
    event,
    page,
    product,
    settings,

    // Objects
    eventVariant,


    // Shopify Connect
    productVariant,
    shopifyProduct,
    shopifyProductVariant,
    productOption,
    productWithVariant,

    // Shopify Connect helpers
    proxyString,
    placeholderString
  ])
})
