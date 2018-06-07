import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "state/actions/productsActions";

class ProductDetailContainer extends ContainerBase {
  view = import("views/ProductDetailView");

  model = () => {
    const {
      actions: { fetchProduct }
    } = this.props;
    return fetchProduct(this.props.match.params.productHandle).then(res => res);
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProduct
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetailContainer);
