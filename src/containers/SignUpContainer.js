import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUpCustomer } from 'state/actions/customerActions';
import customer from 'state/selectors/customer';

class SignUpContainer extends ContainerBase {
  view = import('views/SignUpView');
}

const mapStateToProps = state => {
  return {
    customer: customer(state)
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
