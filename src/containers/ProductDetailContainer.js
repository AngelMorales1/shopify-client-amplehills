import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import { fetchOurPledge } from 'state/actions/productActions';
import fetchShippingDates from 'state/selectors/fetchShippingDates';
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
    shippingDates: fetchShippingDates(state),
    ourPledge: get(state, 'product.ourPledge.items[0].fields', {})
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        fetchOurPledge
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
