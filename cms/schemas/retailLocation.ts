import states from 'states-us';

const abbreviatedState = function(name) {
  return states.find(state => state.name === name)?.abbreviation || '';
};

export default {
  name: 'retailLocation',
  title: 'Retail Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of Location',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Street Address',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: states.map(state => ({
          title: state.name,
          value: state.name
        })),
        layout: 'dropdown'
      }
    },
    {
      name: 'zip',
      title: 'ZIP',
      type: 'string'
    },
    {
      name: 'geopoint',
      title: 'Geopoint',
      type: 'geopoint',
    },
    {
      name: 'distributor',
      title: 'Distributor',
      type: 'string',
      hidden: true,
    },
    {
      name: 'distributor_ref',
      title: 'Distributor',
      type: 'reference',
      to: [{ type: 'distributor' }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'retailLocationTag', title: 'Location Tag' }] }]
    }
  ],
  preview: {
    select: {
      name: 'name',
      address: 'address',
      city: 'city',
      state: 'state',
      zip: 'zip'
    },
    prepare(selection) {
      return {
        title: selection.name,
        subtitle: `${selection.address}, ${selection.city}, ${abbreviatedState(selection.state)}, ${selection.zip}`
      }
    }
  }
};
