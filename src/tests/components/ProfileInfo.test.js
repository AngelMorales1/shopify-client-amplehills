import React from 'react';
import { shallow } from 'enzyme';

import ProfileInfo from 'components/ProfileInfo';

it('renders without data', () => {
  const component = shallow(<ProfileInfo />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ProfileInfo
      accessToken={'foo'}
      actions={{
        activateEditCustomerField: () => console.log('foo'),
        addLineItems: () => console.log('foo'),
        cancelEditCustomerFields: () => console.log('foo'),
        checkoutCustomerDisassociate: () => console.log('foo'),
        signOutCustomer: () => console.log('foo'),
        updateCustomer: () => console.log('foo')
      }}
      email={'foo'}
      phone={'foo'}
      customerFieldBeingEdited={[
        {
          foo: 'foo'
        }
      ]}
      successfullyEditedFields={'foo'}
      errors={'foo'}
    />
  );

  expect(component).toMatchSnapshot();
});
