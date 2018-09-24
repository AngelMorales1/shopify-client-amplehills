import React from 'react';
import { shallow } from 'enzyme';

import OurPledgeOverlay from 'components/OurPledgeOverlay';

it('renders without data', () => {
  const component = shallow(<OurPledgeOverlay />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <OurPledgeOverlay
      closeOurPledgeOverlay={() => console.log('foo')}
      shippingInformation={'foo'}
      shippingPledge={'foo'}
      ourPledgeOverlayIsOpen={false}
    />
  );

  expect(component).toMatchSnapshot();
});
