export const Flavor = `{
  _id,
  name,
  slug,
  description
}`;

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
