import color from './../color';
import image from '../image';
import portableText from '../portableText';

export default {
  type: 'object',
  name: 'detailsTabs',
  title: 'Details Tabs',
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
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    {
      name: 'tabs',
      type: 'array',
      of: [{
        name: 'tab',
        type: 'object',
        fieldsets: [
          {
            name: 'mainImage',
            title: 'Main Image',
            options: { collapsible: true, collapsed: true }
          },
          {
            name: 'text1',
            title: 'Text Block 1',
            options: { collapsible: true, collapsed: true }
          },
          {
            name: 'text2',
            title: 'Text Block 2',
            options: { collapsible: true, collapsed: true }
          },
        ],
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string'
          },
          image({
            name: 'image',
            title: 'Image',
            fieldset: 'mainImage'
          }),
          {
            name: 'imageStickerText',
            title: 'Image Sticker Text',
            type: 'string',
            fieldset: 'mainImage'
          },
          portableText({
            name: 'text1',
            title: 'Text 1',
            fieldset: 'text1'
          }),
          image({
            name: 'image1',
            title: 'Image 1',
            description: 'This will display to the left of the first text section on the slide.',
            fieldset: 'text1'
          }),
          portableText({
            name: 'text2',
            title: 'Text 2',
            fieldset: 'text2'
          }),
          image({
            name: 'image2',
            title: 'Image 2',
            description: 'This will display to the left of the second text section on the slide.',
            fieldset: 'text2'
          })
        ]
      }]
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean',
      fieldset: 'options'
    }
  ]
};
