import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'flavors.flavors'),
  flavors => {
    const sanitisedFlavors = get(flavors, 'items', []).map(flavor => {
      return {};
    });

    return sanitisedFlavors;
  }
);
