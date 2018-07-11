import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUpCustomer } from 'state/actions/customerActions';
import customer from 'state/selectors/customer';

import { PENDING, FULFILLED } from 'constants/Status';
import get from 'utils/get';

class SignUpContainer extends ContainerBase {
  componentDidUpdate(prevProps) {
    const customerSignedUp =
      prevProps.customerSigningUp === PENDING &&
      this.props.customerSigningUp === FULFILLED;
    if (customerSignedUp) this.props.history.push(`/sign-in?new-account=true`);
  }

  view = import('views/SignUpView');
}

const mapStateToProps = state => {
  return {
    customer: customer(state),
    customerSigningUp: get(state, 'status.customerSigningUp', false)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signUpCustomer
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
