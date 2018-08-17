import React from 'react';
import { shallow } from 'enzyme';

import ProductGridCard from 'components/ProductGridCard';

it('renders without data', () => {
  const component = shallow(<ProductGridCard />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProductGridCard
      products={{
        foo: {
          vailable: true,
          blocks: [{}],
          cartDetails: 'foo',
          description: 'foo',
          flavorDescription: 'foo',
          gridImage: 'foo',
          handle: 'foo',
          id: 'foo',
          image: 'foo',
          pintImage: 'foo',
          price: 0,
          subItems: [],
          subItemsAvailable: true,
          title: 'foo'
        }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});