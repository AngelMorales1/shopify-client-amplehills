import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CollectionDetailContainer extends ContainerBase {
  view = import("views/CollectionDetailView");

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
)(CollectionDetailContainer);
