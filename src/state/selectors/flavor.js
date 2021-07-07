import { createSelector } from 'reselect';
import get from 'utils/get';
import flavors from 'state/selectors/flavors';

export default createSelector(
  state => flavors(state),
  (state, props) => get(props, 'match.params.flavorHandle', ''),
  (flavors, slug) => {
    console.log('DIGOSI', flavors, slug);
    return get(flavors, 'flavors', []).find(flavor => flavor.slug === slug);
  }
);
