import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import {
  openOurPledge,
  closeOurPledge
} from 'state/actions/ui/productUIActions';
import { fetchOurPledge } from 'state/actions/productActions';
import products from 'state/selectors/products';
import product from 'state/selectors/product';

import get from 'utils/get';

class ProductDetailContainer extends ContainerBase {
  view = import('views/ProductDetailView');

  model = () => {
    const {
      actions: { fetchOurPledge }
    } = this.props;

    return fetchOurPledge();
  };
}

const mapStateToProps = (state, props) => {
  return {
    checkout: get(state, 'session.checkout.id'),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    ),
    product: product(state, props),
    products: products(state),
    ourPledge: get(state, 'product.ourPledge.items[0].fields', {}),
    ourPledgeOverlayIsOpen: get(
      state,
      'productUI.ourPledgeOverlayIsOpen',
      false
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        fetchOurPledge,
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
