import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import get from 'utils/get';

import {
  addLocationFilter,
  removeLocationFilter,
  clearLocationFilters,
  updateSearchFilter,
  selectLocation,
  clearLocationSelection,
  getSearchResult
} from 'state/actions/ui/locationsUIActions';

import locations from 'state/selectors/locations';
import locationGeoJSON from 'state/selectors/locationGeoJSON';
import locationResultsLabel from 'state/selectors/locationResultsLabel';
import filteredLocations from 'state/selectors/filteredLocations';
import filteredOutLocations from 'state/selectors/filteredOutLocations';
import alertIsActive from 'state/selectors/alertIsActive';

class LocationsLandingContainer extends ContainerBase {
  view = import('views/LocationsLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    filteredLocations: filteredLocations(state),
    filteredOutLocations: filteredOutLocations(state),
    locationFilters: get(state, 'locationsUI.locationFilters'),
    locations: locations(state),
    locationGeoJSON: locationGeoJSON(state),
    locationResultsLabel: locationResultsLabel(state),
    searchFilter: get(state, 'locationsUI.searchFilter', ''),
    searchResult: get(state, 'locationsUI.searchResult', []),
    selectedLocation: get(state, 'locationsUI.selectedLocation', null),
    alertIsActive: alertIsActive(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLocationFilter,
        removeLocationFilter,
        clearLocationFilters,
        updateSearchFilter,
        selectLocation,
        clearLocationSelection,
        getSearchResult
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationsLandingContainer);
