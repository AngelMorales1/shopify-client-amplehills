import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'utils/get';
import flavor from 'state/selectors/flavor';
import { getFlavors } from 'state/actions/flavorsActions';

class FlavorLandingContainer extends ContainerBase {
  view = import('views/FlavorDetailView');

  model = () => {
    const {
      actions: { getFlavors }
    } = this.props;

    return getFlavors();
  };
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
    actions: bindActionCreators({ getFlavors }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorLandingContainer);
