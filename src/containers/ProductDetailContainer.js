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
import cardsBlock from 'state/selectors/cardsBlock';

import get from 'utils/get';

class ProductDetailContainer extends ContainerBase {
  view = import('views/ProductDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  const selectedProduct = product(state, props);

  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    ),
    product: selectedProduct,
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
    cardsBlock: cardsBlock(selectedProduct)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        openOurPledge,
        closeOurPledge
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
