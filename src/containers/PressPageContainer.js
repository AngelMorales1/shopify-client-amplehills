import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'utils/get';

class PressPageContainer extends ContainerBase {
  view = import('views/PressPageView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems.simpleFragments'
    )
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
)(PressPageContainer);
