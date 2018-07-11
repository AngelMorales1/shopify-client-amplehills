import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutCustomer } from 'state/actions/customerActions';

import products from 'state/selectors/products';
import customer from 'state/selectors/customer';

class ProfileContainer extends ContainerBase {
  view = import('views/ProfileView');
}

const mapStateToProps = state => {
  return {
    products: products(state),
    customer: customer(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signOutCustomer
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
