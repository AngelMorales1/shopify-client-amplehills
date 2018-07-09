import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInUser } from 'state/actions/userActions';

import products from 'state/selectors/products';
import get from 'utils/get';

class SignInContainer extends ContainerBase {
  view = import('views/SignInView');

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
    actions: bindActionCreators(
      {
        signInUser
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
