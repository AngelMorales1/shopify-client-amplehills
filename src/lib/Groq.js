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

export const FlavorLink = `{
  _id,
  _createdAt,
  name,
  slug,
  filters,
  labelColor,
  image{
    'src': asset->url
  }
}`;

export const ProductLink = `{
  _id,
  _createdAt,
  title,
  productHandle,
  price,
  flavorDescription,
  heroImage{
    'src': asset->url
  },
  gridImage{
    'src': asset->url
  },
  pintImage{
    'src': asset->url
  },
  description,
  availableInBYO,
  exclusiveToBYO,
  order,
}`;

export const Block = `{
  ...,
  'image': image${Img},
  'images': images[]${Img},
  'image1': image1${Img},
  'image2': image2${Img},
  'products': products[]->${ProductLink},
  'features': features[]{
    ...,
    'image': image${Img}
  },
  'pressItems': pressItems[]{
    ...,
    'logo': logo${Img}
  },
  'items': items[]->{
    _type == 'flavor' => ${FlavorLink}
  },
  'tabs': tabs[]{
    _type == 'tab' => {
      ...,
      'image': image${Img},
      'image1': image1${Img},
      'image2': image2${Img},
    }
  }
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
  heroImage{
    'src': asset->url
  },
  gridImage{
    'src': asset->url
  },
  pintImage{
    'src': asset->url
  },
  description,
  availableInBYO,
  exclusiveToBYO,
  order,
  blocks[]${Block},
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

export const Location = `{
  _id,
  _createdAt,
  name,
  slug,
  hours,
  region,
  address1,
  address2,
  city,
  state,
  zip,
  phone,
  longitude,
  latitude,
  seasonal,
  delivery,
  offersParties,
  offersCakes,
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

export const Page = `{
  _id,
  _createdAt,
  name,
  slug,
  showSubnav,
  blocks[]${Block},
  seoTitle,
  seoDescription,
  seoImage
}`;

export const Event = `{
  _id,
  _createdAt,
  name,
  handle,
  text,
  location->${Location},
  image${Img},
  'shopifyVariants': variants,
  heroColor,
  heroDescription,
  eventType,
  blocks[]${Block},
  cardText,
  cardButtonLabel,
  seoTitle,
  seoDescription,
  seoImage
}`;

export const Settings = `{
  ...,
  productsInNav[]->${Product},
  productsOnLanding[]->${Product}
}`;
