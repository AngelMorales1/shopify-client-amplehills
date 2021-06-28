import image from './../image';
import color from './../color';
import portableText from './../portableText';

export default {
  type: 'object',
  name: 'upcomingEvents',
  title: 'Upcoming Events',
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
    portableText({
      name: 'text',
      title: 'Text'
    }),
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: ['All Events', 'Pints and Postcards', 'Ice Cream Socials', 'Ice Cream Classes']
      }
    },
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    
    {
      name: 'locationFilterButton',
      title: 'Show Location Filter Button?',
      fieldset: 'options',
      type: 'boolean'
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      fieldset: 'options',
      type: 'boolean'
    },
  ]
};
