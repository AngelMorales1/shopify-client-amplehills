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
      name: 'deprecated',
      title: 'Deprecated',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'hero',
      title: 'Hero',
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
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }]
    },
    {
      name: 'heroColor',
      title: 'Hero Color',
      type: 'string',
      fieldset: 'hero',
    },
    {
      name: 'heroDescription',
      title: 'Short Hero Description',
      type: 'text',
      validation: Rule => Rule.required().min(20).max(350),
      fieldset: 'hero',
    },
    {
      name: 'variants',
      title: 'Variants (Dates)',
      type: 'array',
      of: [{ type: 'eventVariant' }],
      fieldset: 'hero'
    },
    image({
      name: 'image',
      title: 'Image',
      fieldset: 'hero'
    }),
    blocks({
      name: 'blocks',
      title: 'Content Blocks'
    }),
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: ['Pints and Postcards', 'Ice Cream Socials', 'Ice Cream Classes']
      }
    },
    portableText({
      name: 'cardText',
      title: 'Card Text',
      fieldset: 'cardContent'
    }),
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
    portableText({
      name: 'text',
      title: 'Text',
      fieldset: 'deprecated'
    }),
  ]
};
