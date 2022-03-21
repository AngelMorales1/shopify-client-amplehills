import color from './../color';

export default {
  type: 'object',
  name: 'pintFinder',
  title: 'Pint Finder',
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
      type: 'boolean'
    },
  ]
};
