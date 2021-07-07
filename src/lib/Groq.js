export const FlavorFrenzy = `{
  _id,
  _createdAt,
  name,
  slug,
  hero,
  predictions,
  winner,
  "rounds": rounds[]{
    ...,
    "_id": _key,
    "matches": matches[]{
      "_id": _key,
      "flavor1": flavor1->${Flavor},
      "flavor2": flavor2->${Flavor},
      "winner": winner->${Flavor},
    }
  }
}`;

export const InStores = `{
  _id,
  _createdAt,
  title,
  body,
  noResultsTitle,
  noResultsBody
}`;

export const Img = `{
  'src': asset->url,
  alt,
  credit,
  caption,
  crop,
  hotspot,
  'id': asset->_id,
  'metadata': asset->metadata
}`;

export const Block = `{
  ...,
  'image': image${Img}
}`;

export const RetailLocation = `{
  _id,
  _createdAt,
  name,
  address,
  city,
  state,
  zip,
  geopoint,
  distributor,
  tags[]->{ ... }
}`;

export const Product = `{
  _id,
  _createdAt,
  title,
  productHandle,
  price,
  flavorDescription,
  gridImage{
    'src': asset->url
  },
  pintImage{
    'src': asset->url
  },
  description,
  availableInBYO,
  exclusiveToBYO,
  blocks,
  seoTitle,
  seoDescription,
  seoImage
}`;

export const Flavor = `{
  _id,
  _createdAt,
  name,
  slug,
  showOnFlavorsPage,
  dietaryRestrictions,
  filters,
  labelColor,
  availableLocations,
  order,
  image{
    'src': asset->url
  },
  description,
  blocks[]${Block},
  seoTitle,
  seoDescription,
  seoImage
}`;
