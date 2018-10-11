import {
  shopifyProducts,
  contentfulProducts
} from 'tests/state/mocks/unselected/merchandise';
import selectedallMerchandise from 'tests/state/mocks/selected/allMerchandise';
import allMerchandise from 'state/selectors/allMerchandise';

it('allMerchandise selector works as intended', () => {
  expect(
    allMerchandise.resultFunc(shopifyProducts, contentfulProducts)
  ).toEqual(selectedallMerchandise);
});
