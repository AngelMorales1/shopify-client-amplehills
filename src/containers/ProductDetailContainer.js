import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLineItems } from 'state/actions/checkoutActions';
import { fetchProduct } from 'state/actions/productActions';
import { fetchProductContent } from 'state/actions/contentActions';
import { getGlobalSettings } from 'state/actions/ui/applicationUIActions';

import get from 'utils/get';

class ProductDetailContainer extends ContainerBase {
  view = import('views/ProductDetailView');

  model = () => {
    const {
      actions: { fetchProduct, fetchProductContent, getGlobalSettings }
    } = this.props;

    const handle = this.props.match.params.productHandle;
    return Promise.all([
      fetchProduct(handle),
      fetchProductContent(handle),
      getGlobalSettings()
    ]).then(([productResult, contentResult, globalSettings]) => {
      return {
        product: get(productResult, 'value'),
        content: get(contentResult, 'value'),
        globalSettings: get(globalSettings, 'value')
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
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProduct,
        fetchProductContent,
        addLineItems,
        getGlobalSettings
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
