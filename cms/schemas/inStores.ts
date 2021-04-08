export default {
  name: 'inStores',
  title: 'In-Stores',
  type: 'document',
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero Content',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'noResults',
      title: 'No Results',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'hero'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'hero'
    },
    {
      name: 'noResultsTitle',
      title: 'No Results Title',
      type: 'string',
      fieldset: 'noResults'
    },
    {
      name: 'noResultsBody',
      title: 'No Results Body',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'noResults'
    }
  ]
};
