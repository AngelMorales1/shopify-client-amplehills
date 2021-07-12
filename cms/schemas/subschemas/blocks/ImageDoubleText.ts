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
    color({
      name: 'subtitleColor',
      title: 'Subtitle Color',
      limit: ['peach', 'blue']
    }),
    {
      name: 'title1',
      title: 'Title 1',
      type: 'string'
    },
    portableText({
      name: 'text1',
      title: 'Text 1'
    }),
    {
      name: 'title2',
      title: 'Title 2',
      type: 'string'
    },
    portableText({
      name: 'text2',
      title: 'Text 2'
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
