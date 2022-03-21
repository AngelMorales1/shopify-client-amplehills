import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'faq',
  title: 'FAQ',
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
      name: 'questions',
      title: 'Headings and Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heading',
          title: 'Heading',
          fields: [
            {
              type: 'string',
              name: 'heading',
              title: 'Heading',
            }
          ]
        },
        {
          type: 'object',
          name: 'question',
          title: 'Questions/Answer',
          fields: [
            {
              type: 'string',
              name: 'question',
              title: 'Question',
            },
            {
              type: 'string',
              name: 'answer',
              title: 'Answer',
            },
          ]
        }
      ]
    },
    {
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string'
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true })
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean'
    },
  ]
};
