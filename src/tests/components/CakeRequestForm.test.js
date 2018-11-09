import React from 'react';
import { shallow } from 'enzyme';

import CakeRequestForm from 'components/CakeRequestForm';

it('renders without data', () => {
  const component = shallow(<CakeRequestForm />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <CakeRequestForm
      cakeLocations={{
        '000a': {
          id: '000a',
          title: 'Gowanus',
          availableFlavors: [
            {
              title: 'Flavor 1'
            }
          ]
        }
      }}
      cakeFlavors={[
        {
          title: 'Cake Flavor 1',
          description: 'Cake Flavor 1 description'
        }
      ]}
      cakeToppings={[
        {
          title: "M&M's",
          price: '$1.00'
        },
        {
          title: 'Rainbow sprinkles',
          price: '$1.00'
        }
      ]}
      cakeFillings={[
        {
          title: 'Fudge'
        },
        {
          title: 'Salted Caramel'
        }
      ]}
      cakeDeposit={{
        variants: [
          {
            id: '0001',
            title: '4" Cake',
            price: '49.99'
          },
          {
            id: '0002',
            title: '6" Cake',
            price: '69.99'
          }
        ]
      }}
      actions={{
        addLineItems: f => f
      }}
      checkout={{
        id: '12345abcd'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
