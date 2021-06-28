import slugIsValid from './../utils/slugIsValid';

import image from './subschemas/image';
import portableText from './subschemas/portableText';
import blocks from './subschemas/blocks';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Page Name',
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
      name: 'showSubnav',
      title: 'Show Subnav?',
      type: 'boolean'
    },
    blocks({
      name: 'blocks',
      title: 'Content Blocks'
    }),
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
