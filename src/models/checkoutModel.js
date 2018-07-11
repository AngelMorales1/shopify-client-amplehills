import PropTypes from 'prop-types';
import itemModel from './itemModel.js';

export default {
  propTypes: PropTypes.shape({
    webUrl: PropTypes.string,
    subtotalPrice: PropTypes.string,
    id: PropTypes.string,
    items: itemModel.propTypes
  }),

  default: {
    webUrl: '',
    subtotalPrice: '',
    id: '',
    items: itemModel.default
  }
};
