import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCollections } from "state/actions/collectionsActions";

class CollectionLandingContainer extends ContainerBase {
  view = import("views/CollectionLandingView");

  model = () => {
    const {
      actions: { fetchCollections }
    } = this.props;
    return fetchCollections().then(res => res);
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchCollections
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CollectionLandingContainer);
