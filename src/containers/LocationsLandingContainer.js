import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import locationGeo from 'state/selectors/locationGeo';

class LocationsLandingContainer extends ContainerBase {
  view = import('views/LocationsLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    locationGeo: locationGeo(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LocationsLandingContainer);
