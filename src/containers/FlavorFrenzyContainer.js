import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import Firestore from 'lib/Firestore';
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
    ]).then(async ([genericPage, flavorFrenzy]) => {
      const id = get(flavorFrenzy, 'value._id');
      const predictionsActive = get(
        flavorFrenzy,
        'value.predictions.isActive',
        false
      );
      const winner = get(flavorFrenzy, 'value.winner');
      const votes =
        !predictionsActive && !winner
          ? await Firestore.FlavorFrenzy.getVotes(id)
          : [];

      return {
        genericPage: get(genericPage, 'value'),
        flavorFrenzy: get(flavorFrenzy, 'value'),
        votes
      };
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getGenericPage, getFlavorFrenzy }, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FlavorLandingContainer);
