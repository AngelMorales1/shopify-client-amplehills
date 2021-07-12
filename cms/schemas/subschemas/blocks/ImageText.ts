import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'imageText',
  title: 'Image Text',
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
    image({
      name: 'image',
      title: 'Image'
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
    color({
      name: 'buttonColor',
      title: 'Button Color',
      fieldset: 'buttons',
      limit: ['peach', 'blue']
    }),
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
    {
      name: 'reverse',
      title: 'Reverse Image/Text Arrangement?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'fullImage',
      title: 'Scale Image to Fit Box Entirely?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'is5050',
      title: 'Is 50% / 50%?',
      fieldset: 'options',
      type: 'boolean',
      initialValue: () => true
    },
  ]
};
