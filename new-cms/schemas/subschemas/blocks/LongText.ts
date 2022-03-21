import color from './../color';
import portableText, { blocks } from './../portableText';

export default {
  type: 'object',
  name: 'longText',
  title: 'Long Text',
  fieldsets: [
    {
      name: 'options',
      title: 'Options',
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
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    portableText({
      name: 'text',
      title: 'Text'
    }, blocks),
    {
      name: 'drip',
      title: 'Has Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
  ]
};
