import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeToppings.simpleFragments',
      {}
    ),
  cakeToppings => {
    return Object.keys(cakeToppings).reduce((toppings, id) => {
      const cakeTopping = cakeToppings[id];
      const title = get(cakeTopping, 'title', '');
      const price = get(cakeTopping, 'price', '0.00');

      const topping = {
        id,
        title,
        price
      };

      toppings.push(topping);

      return toppings;
    }, []);
  }
);
