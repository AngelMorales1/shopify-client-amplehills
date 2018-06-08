import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "state/actions/productActions";
import { fetchProductContent } from "state/actions/contentActions";
import get from "utils/get";

class ProductDetailContainer extends ContainerBase {
  view = import("views/ProductDetailView");

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
        product: get(productResult, "value"),
        content: get(contentResult, "value")
      };
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchProduct,
        fetchProductContent
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetailContainer);
