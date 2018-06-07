import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class HomeContainer extends ContainerBase {
  view = import("views/HomeView");

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
)(HomeContainer);
