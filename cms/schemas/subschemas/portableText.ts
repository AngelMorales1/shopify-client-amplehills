import color from './color';

export const twoUpCardLinks = {
  name: 'twoUpCardLinks',
  title: '2-Up Card Links',
  type: 'object',
  preview: {
    select: {
      card1: 'card1.title',
      card2: 'card2.title'
    },
    prepare(selection) {
      return {
        title: `${selection.card1} - ${selection.card2}`,
        subtitle: '2-Up Card Links'
      }
    }
  },
  fields: [
    {
      type: 'object',
      name: 'card1',
      title: 'Card 1',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'URL',
          type: 'url',
          validation: Rule => Rule.uri({ allowRelative: true })
        },
        color({
          name: 'backgroundColor',
          title: 'Background Color'
        }),
      ]
    },
    {
      type: 'object',
      name: 'card2',
      title: 'Card 2',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'URL',
          type: 'url',
          validation: Rule => Rule.uri({ allowRelative: true })
        },
        color({
          name: 'backgroundColor',
          title: 'Background Color'
        }),
      ]
    },
  ]
}

export const blocks = [twoUpCardLinks];
export const portableText = (
  options: object = {},
  blocks: object[] = []
) => ({
  type: 'array',
  of: [
    { type: 'block' },
    ...blocks
  ],
  ...options
});

export default portableText;
