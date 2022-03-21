import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'imageDoubleText',
  title: 'Image Double Text',
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
    },
    {
      name: 'image',
      title: 'Image',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'text1',
      title: 'Text Block 1',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'text2',
      title: 'Text Block 2',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    {
      name: 'title1',
      title: 'Title 1',
      type: 'string',
      fieldset: 'text1'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'text1'
    },
    color({
      name: 'subtitleColor',
      title: 'Subtitle Color',
      limit: ['peach', 'blue'],
      fieldset: 'text1'
    }),
    portableText({
      name: 'text1',
      title: 'Text 1',
      fieldset: 'text1'
    }),
    {
      name: 'title2',
      title: 'Title 2',
      type: 'string',
      fieldset: 'text2'
    },
    {
      name: 'subtitle2',
      title: 'Subtitle 2',
      type: 'string',
      fieldset: 'text2'
    },
    color({
      name: 'subtitle2Color',
      title: 'Subtitle Color',
      limit: ['peach', 'blue'],
      fieldset: 'text2'
    }),
    portableText({
      name: 'text2',
      title: 'Text 2',
      fieldset: 'text2'
    }),
    image({
      name: 'image',
      title: 'Image',
      fieldset: 'image'
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
      limit: ['peach', 'navy']
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
      name: 'drip',
      title: 'Has Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'upperDrip',
      title: 'Has Upper Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'reverseX',
      title: 'Reverse X Arrangement?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'reverseY',
      title: 'Reverse Y Arrangement?',
      fieldset: 'options',
      type: 'boolean'
    },
  ]
};
