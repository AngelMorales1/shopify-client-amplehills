import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchShopifyProducts,
  fetchProductLanding,
  fetchContentfulMerch
} from 'state/actions/productsActions';
import products from 'state/selectors/products';
import allMerchandise from 'state/selectors/allMerchandise';
import get from 'utils/get';

class ProductLandingContainer extends ContainerBase {
  view = import('views/ProductLandingView');

  model = () => {
    const {
      actions: {
        fetchShopifyProducts,
        fetchProductLanding,
        fetchContentfulMerch
      }
    } = this.props;

    return Promise.all([
      fetchShopifyProducts(),
      fetchProductLanding(),
      fetchContentfulMerch()
    ]).then(([products, landing]) => {
      return {
        products: get(products, 'value'),
        landing: get(landing, 'value')
      };
    });
  };
}

const mapStateToProps = state => {
  return {
    products: products(state),
    allMerchandise: allMerchandise(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchShopifyProducts,
        fetchProductLanding,
        fetchContentfulMerch
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductLandingContainer);
