import slugIsValid from '../utils/slugIsValid';

import image from './subschemas/image';
import portableText from './subschemas/portableText';
import blocks from './subschemas/blocks';

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'hero',
      title: 'Hero Content',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'images',
      title: 'Secondary Images',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'options',
      title: 'Options',
      options: { collapsible: true, collapsed: true }
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
      description: "The name of the flavor."
    },
    {
      name: 'productHandle',
      title: 'Product Handle / Slug',
      type: 'string',
      validation: Rule => Rule.required().custom(slugIsValid),
      description:
        'This takes the place of the slug/url. This must match the Shopify handle if there is one.'
    },
    {
      name: 'flavorDescription',
      title: 'Flavor Description',
      type: 'string'
    },
    image({
      name: 'heroImage',
      title: 'Hero Image',
      fieldset: 'hero'
    }),
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      fieldset: 'hero'
    },
    portableText({
      name: 'description',
      title: 'Description',
      fieldset: 'hero'
    }),
    {
      name: 'limitedEdition',
      title: 'Limited Edition?',
      type: 'boolean',
      fieldset: 'hero'
    },
    {
      name: 'price',
      title: 'Price (Override)',
      type: 'boolean',
      fieldset: 'hero',
      description: 'This will override the price in Shopify. Leave blank to use Shopify\'s price.'
    },
    image({
      name: 'gridImage',
      title: 'Grid Image',
      fieldset: 'images'
    }),
    image({
      name: 'pintImage',
      title: 'Pint Image',
      fieldset: 'images'
    }),
    blocks({
      name: 'blocks',
      title: 'Content Blocks'
    }),
    {
      name: 'availableInBYO',
      title: 'Available in BYO?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'order',
      title: 'BYO Order',
      type: 'number',
      fieldset: 'options',
      description: 'Products will be shown on BYO from lowest to highest.'
    },
    {
      name: 'exclusiveBYO',
      title: 'Exclusively to BYO packs?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'forceAvailable',
      title: 'Force Available?',
      type: 'boolean',
      description: 'This will force availability and allow customers to add this product to their cart.',
      fieldset: 'options'
    },
    {
      name: 'forceUnavailable',
      title: 'Force Unavailable?',
      type: 'boolean',
      description: 'This will force unavailability and prevents customers from adding this product to their cart.',
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
  ],
  preview: {
    select: {
      title: 'title',
      image: 'pintImage',
      grid: 'gridImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.image || selection.grid
      }
    }
  }
};
