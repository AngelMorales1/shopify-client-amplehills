import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchShopifyProducts,
  fetchProductLanding
} from 'state/actions/productsActions';
import getProductCards from 'state/selectors/getProductCards';
import get from 'utils/get';

class ProductLandingContainer extends ContainerBase {
  view = import('views/ProductLandingView');

  model = () => {
    const {
      actions: { fetchShopifyProducts, fetchProductLanding }
    } = this.props;

    return Promise.all([fetchShopifyProducts(), fetchProductLanding()]).then(
      ([products, landing]) => {
        return {
          products: get(products, 'value'),
          landing: get(landing, 'value')
        };
      }
    );
  };
}

const mapStateToProps = state => {
  return {
    products: getProductCards(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchShopifyProducts,
        fetchProductLanding
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductLandingContainer);
