import slugIsValid from './../utils/slugIsValid';

import image from './subschemas/image';
import blocks from './subschemas/blocks';

export default {
  name: 'flavor',
  title: 'Flavor',
  type: 'document',
  fieldsets: [{
    name: 'seo',
    title: 'SEO',
    options: { collapsible: true, collapsed: true }
  }],
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
    },
    {
      name: 'showOnFlavorsPage',
      title: 'Show on Flavors Page?',
      type: 'boolean'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    image({
      name: 'image',
      title: 'Image'
    }),
    blocks({
      name: 'blocks',
      title: 'Content Blocks'
    }),
    {
      name: 'dietaryRestrictions',
      title: 'Dietary Restrictions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {
            value: 'nuts',
            title: 'Contains Nuts',
          },
          {
            value: 'glutenFree',
            title: 'Gluten Free'
          },
          {
            value: 'vegan',
            title: 'Vegan'
          }
        ]
      }
    },
    {
      name: 'filters',
      title: 'Filters',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {
            value: 'shipsNationwide',
            title: 'Ships Nationwide',
          },
          {
            value: 'mix-ins',
            title: 'Full O\' Mix-Ins'
          },
          {
            value: 'chocolatey',
            title: 'Chocolatey'
          },
          {
            value: 'shopSpecific',
            title: 'Shop Specific'
          }
        ]
      }
    },
    {
      name: 'availableLocations',
      title: 'Available Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'location' }] }]
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'string',
      fieldset: 'seo'
    },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      fieldset: 'seo'
    },
  ]
};
