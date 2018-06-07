import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CollectionLandingContainer extends ContainerBase {
  view = import("views/CollectionLandingView");

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
)(CollectionLandingContainer);
