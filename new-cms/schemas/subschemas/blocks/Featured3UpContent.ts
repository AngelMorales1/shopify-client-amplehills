import color from './../color';
import image from '../image';
import portableText from '../portableText';

export default {
  type: 'object',
  name: 'featured3UpContent',
  title: 'Featured 3-Up Content',
  fieldsets: [
    {
      name: 'options',
      title: 'Options',
      options: { collapsible: true, collapsed: true }
    },
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
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'features',
      title: 'Feature Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          portableText({
            name: 'description',
            title: 'Description'
          }),
          image({
            name: 'image',
            title: 'Image'
          }),
          {
            name: 'link',
            title: 'Link',
            type: 'url',
            validation: Rule => Rule.uri({ allowRelative: true })
          },
          {
            name: 'linkText',
            title: 'Link Text',
            type: 'string'
          }
        ]
      }]
    }
  ]
};
