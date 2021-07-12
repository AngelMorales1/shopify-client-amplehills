import image from '../image';
import color from '../color';
import portableText from '../portableText';

export default {
  type: 'object',
  name: 'centeredCarousel',
  title: 'Centered Carousel',
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
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        image({
          name: 'image',
          title: 'Image'
        })
      ]
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'upperDrip',
      title: 'Has Upper Drip?',
      type: 'boolean',
      fieldset: 'options'
    },
  ]
};
