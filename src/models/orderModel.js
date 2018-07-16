import PropTypes from 'prop-types';
import itemModel from 'models/itemModel';

export default {
  propTypes: PropTypes.shape({
    id: PropTypes.string,
    orderNumber: PropTypes.string,
    receipt: PropTypes.string,
    items: PropTypes.arrayOf(itemModel.propTypes),
    totalPrice: PropTypes.number,
    date: PropTypes.string
  }),

  default: {
    id: '',
    orderNumber: '',
    receipt: '',
    items: [],
    totalPrice: 0.0,
    date: ''
  }
};
