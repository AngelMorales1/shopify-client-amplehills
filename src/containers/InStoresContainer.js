import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sanity from 'lib/Sanity';
import get from 'utils/get';

class InStoresContainer extends ContainerBase {
  view = import('views/InStoresView');

  model = () => {
    return Promise.all([
      Sanity.fetchInStores(),
      Sanity.fetchRetailLocations()
    ]).then(([content, retailLocations]) => ({ content, retailLocations }));
  };
}

const mapStateToProps = state => {
  const fields = get(state, 'applicationUI.globalSettings.items[0].fields', {});
  return {
    text: get(fields, 'inStoresText', ''),
    localRetailers: get(fields, 'inStoresLocalRetailers.simpleFragments', {})
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
)(InStoresContainer);
