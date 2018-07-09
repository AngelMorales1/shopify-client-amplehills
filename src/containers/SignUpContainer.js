import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import products from 'state/selectors/products';
import get from 'utils/get';

class SignUpContainer extends ContainerBase {
  view = import('views/SignUpView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    products: products(state),
    user: get(state, 'user')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
