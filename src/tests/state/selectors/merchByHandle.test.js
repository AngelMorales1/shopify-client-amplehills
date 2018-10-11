import selectedallMerchandise from 'tests/state/mocks/selected/allMerchandise';
import selectedmerchByHandle from 'tests/state/mocks/selected/merchByHandle';
import merchByHandle from 'state/selectors/merchByHandle';

it('merchByHandle selector works as intended', () => {
  const handle = 'test-product';

  expect(merchByHandle.resultFunc(selectedallMerchandise, handle)).toEqual(
    selectedmerchByHandle
  );
});
