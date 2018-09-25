import React from 'react';
import { shallow } from 'enzyme';

import OurPledge from 'components/OurPledge';

it('renders without data', () => {
  const component = shallow(<OurPledge />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <OurPledge
      actions={{}}
      ourPledgeOverlayIsOpen={false}
      shippingInformation={'foo'}
      shippingPledge={'foo'}
      calloutImage={'foo'}
    />
  );

  expect(component).toMatchSnapshot();
});
