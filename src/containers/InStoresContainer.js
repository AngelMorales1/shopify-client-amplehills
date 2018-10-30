import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'utils/get';

class InStoresContainer extends ContainerBase {
  view = import('views/InStoresView');

  model = () => {};
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
