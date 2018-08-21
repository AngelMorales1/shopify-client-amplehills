import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPressData } from 'state/actions/pressActions';

import get from 'utils/get';

class PressPageContainer extends ContainerBase {
  view = import('views/PressPageView');

  model = () => {
    const { getPressData } = this.props.actions;

    return getPressData();
  };
}

const mapStateToProps = state => {
  console.log(state);
  return {
    pressBlocks: get(state, 'press.press.items[0].fields.pressBlock', {})
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getPressData
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PressPageContainer);
