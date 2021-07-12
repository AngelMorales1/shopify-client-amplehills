import slugIsValid from './../utils/slugIsValid';

import image from './subschemas/image';
import blocks from './subschemas/blocks';

export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'contact',
      title: 'Contact Info',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'options',
      title: 'Options',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string'
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
      name: 'region',
      title: 'Region',
      type: 'string'
    },
    {
      type: 'object',
      name: 'hours',
      title: 'Hours',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'string'
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string'
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string'
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'string'
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'string'
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string'
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'string'
        },
      ]
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'zip',
      title: 'ZIP',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'seasonal',
      title: 'Is Seasonal?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'delivery',
      title: 'Offers Delivery?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'deliveryLink',
      title: 'Delivery Link',
      type: 'string',
      fieldset: 'options'
    },
    {
      name: 'offersParties',
      title: 'Offers Parties?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'offersCakes',
      title: 'Offers Cakes?',
      type: 'boolean',
      fieldset: 'options'
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
