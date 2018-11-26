import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeSprinkles.simpleFragments',
      {}
    ),
  cakeSprinkles => {
    return Object.keys(cakeSprinkles).reduce((fillings, id) => {
      const cakeSprinkle = cakeSprinkles[id];
      const title = get(cakeSprinkle, 'title', '');

      const filling = {
        id,
        title
      };

      fillings.push(filling);

      return fillings;
    }, []);
  }
);
