import color from './../color';

export default {
  type: 'object',
  name: 'htmlEmbed',
  title: 'HTML Embed',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'html',
      title: 'HTML',
      type: 'text',
      rows: '5'
    },
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean'
    },
  ]
};
