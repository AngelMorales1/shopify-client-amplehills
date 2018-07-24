import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import locationGeoJSON from 'state/selectors/locationGeoJSON';

class LocationsLandingContainer extends ContainerBase {
  view = import('views/LocationsLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    locationGeoJSON: locationGeoJSON(state)
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
)(LocationsLandingContainer);
