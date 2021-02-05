import slugIsValid from './../utils/slugIsValid';

export default {
  name: 'flavor',
  title: 'Flavor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Flavor Name',
      type: 'string',
      description: "The name of the flavor."
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: Rule => Rule.required().custom(slugIsValid),
      description:
        'This is the URL for the flavor. Should look like "the-name-of-the-flavor" all lowercase and separated by hyhens. This should match the Shopify product handle if there is one. Example: "pb-wins-the-cup"'
    }
  ]
};
