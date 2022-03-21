import color from './../color';

export default {
  type: 'object',
  name: 'videoBlock',
  title: 'Video Block',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'url',
      title: 'Video URL',
      type: 'url'
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
