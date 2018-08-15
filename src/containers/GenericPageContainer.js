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

    return getGenericPage(path);
  };
}

const mapStateToProps = state => {
  return {
    genericPage: get(state, 'genericPage.genericPage.items', []),
    blocks: get(state, 'genericPage.genericPage.includes.Entry', [])
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
