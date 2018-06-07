import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ProductDetailContainer extends ContainerBase {
  view = import("views/ProductDetailView");

  model = () => {};
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetailContainer);
