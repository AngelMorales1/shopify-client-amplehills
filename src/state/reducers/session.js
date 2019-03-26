import { combineReducers } from 'redux';
import checkout from './checkout';
import newsletterModal from './ui/newsletterModal';

export default combineReducers({
  checkout,
  newsletterModal
});
