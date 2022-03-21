import color from './../color';

export default {
  type: 'object',
  name: 'productPintList',
  title: 'Product Pint List',
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
      name: 'products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean',
      fieldset: 'options'
    }
  ]
};
