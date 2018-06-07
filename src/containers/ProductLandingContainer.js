import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "state/actions/productsActions";

class ProductLandingContainer extends ContainerBase {
  view = import("views/ProductLandingView");

  model = () => {
    const {
      actions: { fetchProducts }
    } = this.props;
    return fetchProducts().then(res => res);
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProducts
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductLandingContainer);
