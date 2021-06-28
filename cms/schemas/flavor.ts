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
            label: 'Contains Nuts',
          },
          {
            value: 'glutenFree',
            label: 'Gluten Free'
          },
          {
            value: 'vegan',
            label: 'Vegan'
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
            label: 'Ships Nationwide',
          },
          {
            value: 'mix-ins',
            label: 'Full O\' Mix-Ins'
          },
          {
            value: 'chocolatey',
            label: 'Chocolatey'
          },
          {
            value: 'shopSpecific',
            label: 'Shop Specific'
          }
        ]
      }
    },
    {
      name: 'labelColor',
      title: 'Label Color',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          {
            value: 'green',
            label: 'Green',
          },
          {
            value: 'red',
            label: 'Red'
          },
          {
            value: 'blue',
            label: 'Blue'
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
