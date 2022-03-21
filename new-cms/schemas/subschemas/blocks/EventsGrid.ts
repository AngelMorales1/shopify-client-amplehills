import image from '../image';
import color from '../color';
import portableText from '../portableText';

export default {
  type: 'object',
  name: 'eventsGrid',
  title: 'Events Grid',
  // fieldsets: [
  //   {
  //     name: 'options',
  //     title: 'Options',
  //     options: { collapsible: true, collapsed: true }
  //   },
  // ],
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
    color({
      name: 'backgroundColor',
      title: 'Background Color'
    }),
    {
      name: 'eventType',
      title: 'Event Type Preset',
      type: 'string',
      options: {
        list: ['All Events', 'Ample Hills Live', 'Ice Cream Classes']
      }
    },
    {
      name: 'location',
      title: 'Location Preset',
      type: 'reference',
      to: [{ type: 'location' }]
    },
    {
      name: 'drip',
      title: 'Has Drip?',
      type: 'boolean'
    },
  ]
};
