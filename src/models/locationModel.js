import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    title: PropTypes.string,
    delivery: PropTypes.bool,
    monday: PropTypes.string,
    tuesday: PropTypes.string,
    wednesday: PropTypes.string,
    thursday: PropTypes.string,
    friday: PropTypes.string,
    saturday: PropTypes.string,
    sunday: PropTypes.string,
    id: PropTypes.string
  }),

  default: {
    title: '',
    delivery: false,
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    id: ''
  }
};
