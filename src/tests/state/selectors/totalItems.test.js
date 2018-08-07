import totalItems from 'state/selectors/totalItems';

it('totalItems selector works as intended', () => {
  const items = [
    {
      node: {
        id: '0000',
        quantity: 1
      }
    },
    {
      node: {
        id: '0001',
        quantity: 3
      }
    }
  ];

  expect(totalItems.resultFunc(items)).toEqual(4);
});
