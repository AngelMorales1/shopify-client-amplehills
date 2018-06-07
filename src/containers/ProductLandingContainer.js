import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ProductLandingContainer extends ContainerBase {
  view = import("views/ProductLandingView");

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
)(ProductLandingContainer);
