import PropTypes from 'prop-types';
import imageModel from './imageModel.js';

export default {
  propTypes: PropTypes.shape({
    fields: PropTypes.shape({
      date: PropTypes.string,
      eventType: PropTypes.string,
      image: imageModel.propTypes,
      location: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string
        })
      }),
      time: PropTypes.string,
      title: PropTypes.string
    })
  }),

  default: {
    fields: {
      date: '',
      eventType: '',
      image: imageModel.propTypes,
      location: {
        fields: {
          title: ''
        }
      },
      time: '',
      title: ''
    }
  }
};
