import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  title: 'Full-Width Images',
  name: 'fullWidthImages',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      type: 'array',
      name: 'mobileImages',
      title: 'Mobile Images',
      of: [
        image({
          name: 'image',
          title: 'Image'
        })
      ]
    },
    {
      type: 'array',
      name: 'desktopImages',
      title: 'Desktop Images',
      of: [
        image({
          name: 'image',
          title: 'Image'
        })
      ]
    }
  ]
};
