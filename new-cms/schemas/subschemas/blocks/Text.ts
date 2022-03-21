import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'textBlock',
  title: 'Text',
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
      type: 'string'
    },
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
      name: 'textLinkLabel',
      title: 'Text Link Label',
      fieldset: 'buttons',
      type: 'string'
    },
    {
      name: 'textLink',
      title: 'Text Link',
      fieldset: 'buttons',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true })
    },
    {
      name: 'titleOnLeft',
      title: 'Title on Left?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'titleOnLeftVerticallyCentered',
      title: 'Title on Left is Vertically Centered?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'centerAlignTextContent',
      title: 'Center Align Text Content?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
  ]
};
