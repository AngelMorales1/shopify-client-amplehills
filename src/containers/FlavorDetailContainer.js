import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flavor from 'state/selectors/flavor';

class FlavorLandingContainer extends ContainerBase {
  view = import('views/FlavorDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    flavor: flavor(state, props)
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
