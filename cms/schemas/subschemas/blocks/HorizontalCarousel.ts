import image from '../image';
import color from '../color';
import portableText from '../portableText';

export default {
  type: 'object',
  name: 'horizontalCarousel',
  title: 'Horizontal Carousel',
  fieldsets: [
    {
      name: 'options',
      title: 'Options',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'buttons',
      title: 'Buttons',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    color({
      name: 'subtitleColor',
      title: 'Subtitle Color',
      limit: ['peach', 'blue']
    }),
    portableText({
      name: 'text',
      title: 'Text'
    }),
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    {
      name: 'buttonLabel',
      title: 'Button Label',
      fieldset: 'buttons',
      type: 'string'
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      fieldset: 'buttons',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true })
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'flavor' }]
        },
        {
          name: 'pressItem',
          title: 'Press Item',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'quote',
              title: 'Quote',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: Rule => Rule.uri({ allowRelative: true })
            },
            image({
              name: 'logoImage',
              title: 'Logo Imafe'
            }),
          ]
        }
      ]
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'reverse',
      title: 'Reverse Image/Text Arrangement?',
      fieldset: 'options',
      type: 'boolean'
    },
  ]
};
