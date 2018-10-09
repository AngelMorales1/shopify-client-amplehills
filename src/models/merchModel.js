import PropTypes from 'prop-types';
import imageModel from 'models/imageModel';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    handle: PropTypes.string,
    available: PropTypes.bool,
    price: PropTypes.number,
    description: PropTypes.string,
    detailsContent: PropTypes.string,
    detailsTitle: PropTypes.string,
    images: PropTypes.arrayOf(imageModel.propTypes),
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        available: PropTypes.bool,
        price: PropTypes.number
      })
    )
  }),

  default: {
    id: '',
    title: '',
    handle: '',
    available: false,
    price: 0.0,
    description: '',
    detailsContent: '',
    detailsTitle: '',
    images: PropTypes.arrayOf(imageModel.default),
    variants: [
      {
        id: '',
        title: '',
        available: false,
        price: 0.0
      }
    ]
  }
};
