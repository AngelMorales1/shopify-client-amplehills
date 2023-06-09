import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import {
  openOurPledge,
  closeOurPledge
} from 'state/actions/ui/productUIActions';
import { openNewsletterModal } from 'state/actions/ui/newsletterModalActions';
import { openCartMax } from 'state/actions/ui/cartMaxUIActions';
import checkout from 'state/selectors/checkout';
import products from 'state/selectors/products';
import product from 'state/selectors/product';
import lineItems from 'state/selectors/lineItems';

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
    lineItems: lineItems(state),
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
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems'
    ),
    settings: get(state, 'applicationUI.settings', {})
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        openOurPledge,
        closeOurPledge,
        openCartMax,
        openNewsletterModal
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
