import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEvents } from 'state/actions/eventsActions';
import events from 'state/selectors/events';

import get from 'utils/get';

import location from 'state/selectors/location';
import locations from 'state/selectors/locations';
import locationGeoJSON from 'state/selectors/locationGeoJSON';

class LocationDetailContainer extends ContainerBase {
  view = import('views/LocationDetailView');

  model = () => {
    const { getEvents } = this.props.actions;

    return getEvents();
  };
}

const mapStateToProps = (state, props) => {
  return {
    location: location(state, props),
    locations: locations(state),
    locationGeoJSON: locationGeoJSON(state),
    blocks: get(location(state, props), 'contentBlocks', []),
    events: events(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getEvents }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailContainer);
