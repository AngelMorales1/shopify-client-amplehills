import PropTypes from 'prop-types';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.string,
    productId: PropTypes.string,
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        handle: PropTypes.string,
        quantity: PropTypes.number
      })
    ),
    title: PropTypes.string
  }),

  default: {
    id: '',
    price: '0.0',
    productId: '',
    subItems: [
      {
        handle: '',
        quantity: 1
      }
    ],
    title: ''
  }
};
