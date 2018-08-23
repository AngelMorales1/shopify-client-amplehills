import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import {
  openOurPledge,
  closeOurPledge
} from 'state/actions/ui/productUIActions';
import checkout from 'state/selectors/checkout';
import products from 'state/selectors/products';
import product from 'state/selectors/product';
import { getPressData } from 'state/actions/pressActions';

import get from 'utils/get';

class ProductDetailContainer extends ContainerBase {
  view = import('views/ProductDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    ),
    product: product(state, props),
    products: products(state),
    ourPledge: get(
      state,
      'applicationUI.globalSettings.items[0].fields.ourPledge.simpleFragments',
      {}
    ),
    ourPledgeOverlayIsOpen: get(
      state,
      'productUI.ourPledgeOverlayIsOpen',
      false
    ),
    press: get(state, 'press.press.items', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        openOurPledge,
        closeOurPledge,
        getPressData
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
