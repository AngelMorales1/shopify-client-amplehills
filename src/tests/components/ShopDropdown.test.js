import React from 'react';
import { shallow } from 'enzyme';

import ShopDropdown from 'components/ShopDropdown';

it('renders without data', () => {
  const component = shallow(<ShopDropdown />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ShopDropdown
      productLanding={{
        description: 'foo',
        hideWholesaleBlock: false,
        iceCreamDescription: '',
        iceCreamProducts: [],
        iceCreamTitle: 'foo',
        merchandiseDescription: 'foo',
        merchandiseProducts: [],
        merchandiseTitle: '',
        products: [],
        subNavigation: true,
        title: 'foo',
        wholesaleDescription: 'foo',
        wholesaleImage: {
          sys: { id: 'foo' },
          fields: { file: { url: 'foo' } }
        },
        wholesaleTitle: 'foo'
      }}
      alertIsActive={false}
      shopOnlineDropdownIsOpen={false}
      onMouseEnter={() => console.log('foo')}
      onMouseLeave={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});
