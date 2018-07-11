import PropTypes from 'prop-types';
import Item from './Item.js';

export default {
  propTypes: PropTypes.shape({
    webUrl: PropTypes.string,
    subtotalPrice: PropTypes.string,
    id: PropTypes.string,
    items: Item.propTypes
  }),

  default: {
    webUrl: '',
    subtotalPrice: '',
    id: '',
    items: Item.default
  }
};
