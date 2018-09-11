import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import get from 'utils/get';

import location from 'state/selectors/location';
import locations from 'state/selectors/locations';

class LocationDetailContainer extends ContainerBase {
  view = import('views/LocationDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    location: location(state, props),
    locations: locations(state),
    blocks: []
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
)(LocationDetailContainer);
