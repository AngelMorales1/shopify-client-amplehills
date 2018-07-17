import PropTypes from 'prop-types';
import itemModel from 'models/itemModel';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    orderNumber: PropTypes.number,
    receipt: PropTypes.string,
    items: PropTypes.arrayOf(itemModel.propTypes),
    totalPrice: PropTypes.string,
    date: PropTypes.string
  }),

  default: {
    id: '',
    orderNumber: 0,
    receipt: '',
    items: [],
    totalPrice: '0.00',
    date: ''
  }
};
