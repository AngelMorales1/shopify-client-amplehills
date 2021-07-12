import color from './../color';

export default {
  type: 'object',
  name: 'press',
  title: 'Press',
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
    {
      name: 'pressItems',
      title: 'Press Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'publication',
              title: 'Publication',
              type: 'string'
            },
            {
              name: 'quote',
              title: 'Quote',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url'
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image'
            }
          ]
        }
      ]
    }
  ]
};
