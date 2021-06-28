import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'genericHero',
  title: 'Generic Hero',
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
    portableText({
      name: 'text',
      title: 'Text'
    }),
    image({
      name: 'image',
      title: 'Image'
    }),
    {
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: ['Stacked', 'Inline']
      }
    },
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
