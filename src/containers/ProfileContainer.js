import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutCustomer, updateCustomer } from 'state/actions/customerActions';
import {
  addLineItems,
  checkoutCustomerDisassociate
} from 'state/actions/checkoutActions';
import {
  activateEditCustomerField,
  cancelEditCustomerFields
} from 'state/actions/ui/customerUIActions';

import products from 'state/selectors/products';
import customer from 'state/selectors/customer';
import checkout from 'state/selectors/checkout';

import get from 'utils/get';

class ProfileContainer extends ContainerBase {
  view = import('views/ProfileView');
}

const mapStateToProps = state => {
  return {
    customerFieldBeingEdited: get(
      state,
      'customerUI.customerFieldBeingEdited',
      ''
    ),
    successfullyEditedFields: get(
      state,
      'customerUI.successfullyEditedFields',
      []
    ),
    errors: get(state, 'customerUI.errors', ''),
    checkout: checkout(state),
    products: products(state),
    customer: customer(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        signOutCustomer,
        updateCustomer,
        checkoutCustomerDisassociate,
        activateEditCustomerField,
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
