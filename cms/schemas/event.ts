import slugIsValid from '../utils/slugIsValid';

import image from './subschemas/image';
import portableText from './subschemas/portableText';
import blocks from './subschemas/blocks';

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'cardContent',
      title: 'Card Content',
      options: { collapsible: true, collapsed: true }
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      description: "The name of the flavor."
    },
    {
      name: 'handle',
      title: 'Product Handle / Slug',
      type: 'string',
      validation: Rule => Rule.required().custom(slugIsValid),
      description:
        'This takes the place of the slug/url. This must match the Shopify handle if there is one.'
    },
    
    portableText({
      name: 'text',
      title: 'Text'
    }),
    image({
      name: 'image',
      title: 'Image'
    }),
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: ['Pints and Postcards', 'Ice Cream Socials', 'Ice Cream Classes']
      }
    },
    {
      name: 'cardText',
      title: 'Card Text',
      type: 'text',
      rows: 3,
      fieldset: 'cardContent'
    },
    {
      name: 'cardButtonLabel',
      title: 'Card Button Label',
      type: 'string',
      fieldset: 'cardContent'
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
