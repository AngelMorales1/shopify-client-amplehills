import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flavors from 'state/selectors/flavors';

class FlavorLandingContainer extends ContainerBase {
  view = import('views/FlavorsLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    flavors: flavors(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorLandingContainer);
