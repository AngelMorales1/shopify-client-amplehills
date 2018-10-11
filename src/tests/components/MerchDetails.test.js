import React from 'react';
import { shallow } from 'enzyme';

import MerchDetails from 'components/MerchDetails';

it('renders without data', () => {
  const component = shallow(<MerchDetails />);
  expect(component).toMatchSnapshot();
});
it('renders with data', () => {
  const component = shallow(
    <MerchDetails
      merch={{
        available: true,
        description: 'foo',
        detailsContent: 'foo',
        detailsTitle: 'foo',
        handle: 'foo',
        id: 'foo',
        images: [],
        price: 0,
        title: '',
        variants: []
      }}
    />
  );
  expect(component).toMatchSnapshot();
});
