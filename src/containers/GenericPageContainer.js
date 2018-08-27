import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenericPage } from 'state/actions/genericPageActions';
import { getPressItems } from 'state/actions/pressActions';
import pressItems from 'state/selectors/pressItems';

import get from 'utils/get';

class GenericPageContainer extends ContainerBase {
  view = import('views/GenericPageView');

  model = () => {
    const { getGenericPage, getPressItems } = this.props.actions;
    const { path } = this.props.match;

    return Promise.all([getGenericPage(path), getPressItems()]).then(
      ([genericPage, pressItems]) => {
        return {
          genericPage: get(genericPage, 'value'),
          latestPressItems: get(pressItems, 'value')
        };
      }
    );
  };
}

const mapStateToProps = state => {
  return {
    blocks: get(
      state,
      'genericPage.genericPage.items[0].fields.contentBlocks',
      []
    ),
    latestPressItems: pressItems(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage,
        getPressItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
