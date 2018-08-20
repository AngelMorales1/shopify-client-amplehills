import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPressPage } from 'state/actions/pressPageActions';

import get from 'utils/get';

class PressPageContainer extends ContainerBase {
  view = import('views/PressPageView');

  model = () => {
    const { getPressPage } = this.props.actions;

    return getPressPage();
  };
}

const mapStateToProps = state => {
  return {
    pressBlocks: get(
      state,
      'pressPage.pressPage.items[0].fields.pressBlock',
      {}
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getPressPage
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PressPageContainer);
