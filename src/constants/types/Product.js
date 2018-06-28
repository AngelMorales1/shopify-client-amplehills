import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    handle: PropTypes.string,
    available: PropTypes.bool,
    flavorDescription: PropTypes.string,
    gridImage: PropTypes.string,
    pintImage: PropTypes.string,
    price: PropTypes.number,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        handle: PropTypes.string,
        available: PropTypes.bool
      })
    ),
    blocks: PropTypes.arrayOf(PropTypes.object)
  }),

  default: {
    id: '',
    title: '',
    handle: '',
    available: false,
    flavorDescription: '',
    gridImage: '',
    pintImage: '',
    price: 0.0,
    variants: [
      {
        id: '',
        title: '',
        available: false,
        price: 0.0
      }
    ],
    blocks: []
  }
};
