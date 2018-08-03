import React from 'react';
import { shallow } from 'enzyme';

import ProductWhatsIncluded from 'components/ProductWhatsIncluded';

it('renders without data', () => {
  const component = shallow(<ProductWhatsIncluded />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProductWhatsIncluded
      block={{
        backgroundColor: 'foo',
        products: [
          {
            fields: {
              productHandle: 'foo'
            }
          }
        ],
        title: 'foo'
      }}
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
      z={0}
    />
  );

  expect(component).toMatchSnapshot();
});
