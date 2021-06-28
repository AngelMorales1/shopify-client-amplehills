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

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    flavor,
    flavorFrenzy,
    inStores,
    retailLocation,
    retailLocationTag,
    location,
    event,
    page,
    product
  ])
})
