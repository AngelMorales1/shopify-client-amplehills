import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'utils/get';
import flavor from 'state/selectors/flavor';
import cardsBlock from 'state/selectors/cardsBlock';

class FlavorLandingContainer extends ContainerBase {
  view = import('views/FlavorDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    flavor: flavor(state, props),
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems'
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
)(FlavorLandingContainer);
