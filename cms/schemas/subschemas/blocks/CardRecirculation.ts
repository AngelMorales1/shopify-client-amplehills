import image from './../image';
import color from './../color';

export default {
  type: 'object',
  name: 'cardRecirculation',
  title: 'Card Recirculation',
  fieldsets: [
    {
      name: 'card1',
      title: 'Card 1',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'card2',
      title: 'Card 2',
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
      name: 'text1',
      title: 'Text 1',
      fieldset: 'card1',
      type: 'string'
    },
    image({
      name: 'image1',
      title: 'Image 1',
      fieldset: 'card1'
    }),
    color({
      name: 'color1',
      title: 'Color 1',
      fieldset: 'card1'
    }),
    {
      name: 'link1',
      title: 'Link 1',
      fieldset: 'card1',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true })
    },
    {
      name: 'text2',
      title: 'Text 2',
      fieldset: 'card2',
      type: 'string'
    },
    image({
      name: 'image2',
      title: 'Image 2',
      fieldset: 'card2'
    }),
    color({
      name: 'color2',
      title: 'Color 2',
      fieldset: 'card2'
    }),
    {
      name: 'link2',
      title: 'Link 2',
      fieldset: 'card2',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true })
    },
  ]
};
