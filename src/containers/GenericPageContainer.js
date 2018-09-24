import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenericPage } from 'state/actions/genericPageActions';

import get from 'utils/get';

class GenericPageContainer extends ContainerBase {
  view = import('views/GenericPageView');

  model = () => {
    const { getGenericPage } = this.props.actions;
    const { path } = this.props.match;

    return Promise.all([getGenericPage(path)]).then(([genericPage]) => {
      return {
        genericPage: get(genericPage, 'value')
      };
    });
  };
}

const mapStateToProps = state => {
  return {
    blocks: get(
      state,
      'genericPage.genericPage.items[0].fields.contentBlocks',
      []
    ),
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems'
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
