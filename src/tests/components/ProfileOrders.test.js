import React from 'react';
import { shallow } from 'enzyme';

import ProfileOrders from 'components/ProfileOrders';

it('renders without data', () => {
  const component = shallow(<ProfileOrders />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProfileOrders
      actions={{
        activateEditCustomerField: () => console.log('foo'),
        addLineItems: () => console.log('foo'),
        cancelEditCustomerFields: () => console.log('foo'),
        checkoutCustomerDisassociate: () => console.log('foo'),
        signOutCustomer: () => console.log('foo'),
        updateCustomer: () => console.log('foo')
      }}
      checkout={{
        completedAt: null,
        currencyCode: 'foo',
        id: 'foo',
        lineItems: {},
        note: null,
        subtotalPrice: '0',
        totalPrice: '0'
      }}
      orders={[
        {
          id: 'foo',
          date: 'foo',
          items: [
            {
              title: 'foo',
              price: 'foo',
              subitems: [
                {
                  handle: 'foo',
                  quantity: 0,
                  handle: 'foo'
                }
              ]
            }
          ]
        }
      ]}
      products={[
        {
          foo: {
            title: 'foo'
          }
        }
      ]}
    />
  );

  expect(component).toMatchSnapshot();
});
