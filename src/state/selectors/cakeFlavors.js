import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeFlavors.simpleFragments',
      {}
    ),
  cakeFlavors => {
    return Object.keys(cakeFlavors).reduce((flavors, id) => {
      const cakeFlavor = cakeFlavors[id];
      const title = get(cakeFlavor, 'title', '');
      const description = get(cakeFlavor, 'description', '');

      const flavor = {
        id,
        title,
        description
      };

      flavors.push(flavor);

      return flavors;
    }, []);
  }
);
