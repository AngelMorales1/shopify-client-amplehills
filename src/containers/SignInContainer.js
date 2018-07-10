import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInCustomer } from 'state/actions/customerActions';

import products from 'state/selectors/products';
import get from 'utils/get';

class SignInContainer extends ContainerBase {
  view = import('views/SignInView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    products: products(state),
    customer: get(state, 'customer')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signInCustomer
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
