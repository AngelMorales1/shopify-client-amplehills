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

    const page = path
      .slice(1)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return getGenericPage(page);
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
