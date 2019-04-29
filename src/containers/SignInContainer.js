import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInCustomer } from 'state/actions/customerActions';

import customer from 'state/selectors/customer';
import get from 'utils/get';

class SignInContainer extends ContainerBase {
  view = import('views/SignInView');
}

const mapStateToProps = state => {
  return {
    checkout: get(state, 'session.checkout', null),
    customer: customer(state),
    customerSigningIn: get(state, 'status.customerSigningIn', false)
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
