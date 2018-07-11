import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string
      }),
      title: PropTypes.string
    }),
    sys: PropTypes.shape({
      id: PropTypes.string
    })
  }),

  default: {
    fields: {
      file: {
        url: ''
      },
      title: ''
    },
    sys: {
      id: ''
    }
  }
};
