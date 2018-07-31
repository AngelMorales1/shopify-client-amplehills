import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    adddress1: PropTypes.string,
    city: PropTypes.string,
    delivery: PropTypes.bool,
    id: PropTypes.string,
    phone: PropTypes.string,
    region: PropTypes.string,
    seasonal: PropTypes.bool,
    state: PropTypes.string,
    title: PropTypes.string,
    zip: PropTypes.string,
    image: PropTypes.shape({
      fileds: PropTypes.shape({
        title: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string
        })
      })
    }),
    location: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number
    }),
    seasonalImage: PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string
        })
      })
    }),
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
    adddress1: '',
    city: '',
    delivery: false,
    id: '',
    phone: '',
    region: '',
    seasonal: true,
    state: '',
    title: '',
    zip: '',
    image: {
      fileds: {
        title: '',
        file: {
          url: ''
        }
      }
    },
    location: {
      lat: 0,
      lon: 0
    },
    seasonalImage: {
      fields: {
        title: '',
        file: {
          url: ''
        }
      }
    },
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
