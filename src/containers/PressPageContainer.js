import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPressItems } from 'state/actions/pressActions';

import get from 'utils/get';

class PressPageContainer extends ContainerBase {
  view = import('views/PressPageView');

  model = () => {
    const { getPressItems } = this.props.actions;

    return getPressItems();
  };
}

const mapStateToProps = state => {
  return {
    pressCards: get(state, 'press.press.items', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getPressItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PressPageContainer);
