import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import {
  getGenericPage,
  getFlavorFrenzy
} from 'state/actions/genericPageActions';

class FlavorLandingContainer extends ContainerBase {
  view = import('views/FlavorFrenzyView');

  model = () => {
    const { getGenericPage, getFlavorFrenzy } = this.props.actions;

    const slug = get(this, 'props.match.params.flavorFrenzy', '');

    return Promise.all([
      getGenericPage(`/${slug}`, true),
      getFlavorFrenzy(`${slug}`)
    ]).then(([genericPage, flavorFrenzy]) => {
      return {
        genericPage: get(genericPage, 'value'),
        flavorFrenzy: get(flavorFrenzy, 'value')
      };
    });
  };
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getGenericPage, getFlavorFrenzy }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorLandingContainer);
