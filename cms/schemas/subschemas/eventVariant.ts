export default {
  type: 'object',
  name: 'eventVariant',
  title: 'Event Variant',
  preview: {
    select: {
      title: 'shopifyName'
    },
    prepare: selection => ({
      title: selection.title
    })
  },
  fields: [
    {
      name: 'shopifyName',
      title: 'Shopify Name',
      type: 'string',
      description: 'Copy and paste the full variant name.'
    },
    {
      name: 'datetime',
      title: 'Date & Time',
      type: 'datetime',
    },
    {
      name: 'doorsOpen',
      title: 'Doors Open',
      type: 'datetime',
    },
    {
      name: 'duration',
      title: 'Duration (Minutes)',
      type: 'number',
      initialValue: 90
    }
  ]
}