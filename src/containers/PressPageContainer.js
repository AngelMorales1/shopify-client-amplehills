import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPressItems } from 'state/actions/pressActions';
import pressItems from 'state/selectors/pressItems';

import get from 'utils/get';

class PressPageContainer extends ContainerBase {
  view = import('views/PressPageView');

  model = () => {
    const { getPressItems } = this.props.actions;

    return getPressItems();
  };
}

const mapStateToProps = state => {
  console.log(state);
  return {
    pressItems: pressItems(state)
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
