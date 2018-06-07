import ContainerBase from "lib/ContainerBase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCollection } from "state/actions/collectionActions";

class CollectionDetailContainer extends ContainerBase {
  view = import("views/CollectionDetailView");

  model = () => {
    const {
      actions: { fetchCollection }
    } = this.props;
    return fetchCollection(this.props.match.params.collectionHandle).then(
      res => res
    );
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchCollection
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CollectionDetailContainer);
