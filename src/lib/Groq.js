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
