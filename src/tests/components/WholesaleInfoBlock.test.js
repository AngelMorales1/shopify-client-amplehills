import React from 'react';
import { shallow } from 'enzyme';

import WholesaleInfoBlock from 'components/WholesaleInfoBlock';

it('renders without data', () => {
  const component = shallow(<WholesaleInfoBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <WholesaleInfoBlock image="foo" title="foo" description="foo" />
  );

  expect(component).toMatchSnapshot();
});
