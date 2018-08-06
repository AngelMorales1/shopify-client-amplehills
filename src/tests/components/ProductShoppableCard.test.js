import React from 'react';
import { shallow } from 'enzyme';

import ProductShoppableCard from 'components/ProductShoppableCard';

it('renders without data', () => {
  const component = shallow(<ProductShoppableCard />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProductShoppableCard
      product={{
        available: true,
        blocks: [],
        cartDetails: 'foo',
        description: 'foo',
        flavorDescription: 'foo',
        gridImage: 'foo',
        handle: 'foo',
        id: 'foo',
        pintImage: 'foo',
        price: 0,
        subItems: [],
        subItemsAvailable: true,
        title: 'foo',
        variants: [{}]
      }}
      quantity={0}
      handleAddProduct={() => console.log('foo')}
      handleRemoveProduct={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});
