import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    delivery: PropTypes.bool,
    id: PropTypes.string,
    phone: PropTypes.string,
    region: PropTypes.string,
    seasonal: PropTypes.bool,
    state: PropTypes.string,
    title: PropTypes.string,
    zip: PropTypes.string,
    image: PropTypes.string,
    coordinate: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number
    }),
    seasonalImage: PropTypes.string,
    hours: PropTypes.shape({
      monday: PropTypes.string,
      tuesday: PropTypes.string,
      wednesday: PropTypes.string,
      thursday: PropTypes.string,
      friday: PropTypes.string,
      saturday: PropTypes.string,
      sunday: PropTypes.string
    })
  }),

  default: {
    address1: '',
    address2: '',
    city: '',
    delivery: false,
    id: '',
    phone: '',
    region: '',
    seasonal: true,
    state: '',
    title: '',
    zip: '',
    image: '',
    coordinate: {
      lat: 0,
      lon: 0
    },
    seasonalImage: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  }
};
