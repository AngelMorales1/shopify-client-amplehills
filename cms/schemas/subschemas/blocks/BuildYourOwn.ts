import portableText from './../portableText';

export default {
  type: 'object',
  name: 'buildYourOwn',
  title: 'Build Your Own',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    portableText({
      name: 'text',
      title: 'Text'
    }),
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean'
    },
  ]
};
