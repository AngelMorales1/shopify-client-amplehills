export default options => ({
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'credit',
      type: 'string',
      title: 'Credit',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'alt',
      title: 'Alt',
      type: 'string',
      description:
        'Image description for accessibility. This will be read by screen readers so describe the contents of the image if different from the editorialized caption.',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    }
  ],
  ...options
});
