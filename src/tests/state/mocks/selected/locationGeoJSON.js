import moment from 'moment';

export default {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [80.123, 40.789]
      },
      properties: {
        id: '0001'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [80.123, 40.789]
      },
      properties: {
        id: '0002'
      }
    }
  ]
};
