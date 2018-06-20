import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import { fetchProduct } from 'state/actions/productActions';
import { fetchProductContent } from 'state/actions/contentActions';
import fetchShippingDates from 'state/selectors/fetchShippingDates';
import get from 'utils/get';

class ProductDetailContainer extends ContainerBase {
  view = import('views/ProductDetailView');

  model = () => {
    const {
      actions: { fetchProduct, fetchProductContent }
    } = this.props;

    const handle = this.props.match.params.productHandle;
    return Promise.all([
      fetchProduct(handle),
      fetchProductContent(handle)
    ]).then(([productResult, contentResult]) => {
      return {
        product: get(productResult, 'value'),
        content: get(contentResult, 'value')
      };
    });
  };
}

const mapStateToProps = state => {
  return {
    checkout: get(state, 'session.checkout.id'),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    ),
    shippingDates: fetchShippingDates(state),
    ourPledge: get(state, 'applicationUI.ourPledge.items[0].fields', {})
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProduct,
        fetchProductContent,
        addLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
