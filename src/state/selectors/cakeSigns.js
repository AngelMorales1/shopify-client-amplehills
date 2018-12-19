import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.complimentaryCakeSign.simpleFragments',
      {}
    ),
  cakeSigns => {
    return Object.keys(cakeSigns).reduce((complimentaryCakeSigns, id) => {
      const cakeSign = cakeSigns[id];
      const sign = get(cakeSign, 'sign', '');

      const complimentaryCakeSign = {
        id,
        sign
      };

      complimentaryCakeSigns.push(complimentaryCakeSign);

      return complimentaryCakeSigns;
    }, []);
  }
);
