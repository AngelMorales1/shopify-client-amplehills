import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutCustomer } from 'state/actions/customerActions';
import { checkoutCustomerDisassociate } from 'state/actions/checkoutActions';
import {
  editCustomerField,
  cancelEditCustomerFields
} from 'state/actions/ui/customerUIActions';

import products from 'state/selectors/products';
import customer from 'state/selectors/customer';

import get from 'utils/get';

class ProfileContainer extends ContainerBase {
  view = import('views/ProfileView');
}

const mapStateToProps = state => {
  return {
    customerFieldsBeingEdited: get(
      state,
      'customerUI.customerFieldsBeingEdited',
      []
    ),
    checkout: get(state, 'session.checkout', {}),
    products: products(state),
    customer: customer(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        signOutCustomer,
        checkoutCustomerDisassociate,
        editCustomerField,
        cancelEditCustomerFields
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
