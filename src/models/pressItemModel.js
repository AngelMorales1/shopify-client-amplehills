import PropTypes from 'prop-types';
import imageModel from 'models/imageModel';

export default {
  propTypes: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        linkUrl: PropTypes.string,
        logoImage: imageModel.propTypes,
        quote: PropTypes.string,
        title: PropTypes.string
      }),
      sys: PropTypes.shape({
        id: PropTypes.string
      })
    })
  ),

  default: [
    {
      fields: {
        linkUrl: '',
        logoImage: imageModel.default,
        quote: '',
        title: ''
      },
      sys: {
        id: ''
      }
    }
  ]
};
