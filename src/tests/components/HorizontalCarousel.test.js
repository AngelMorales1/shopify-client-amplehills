import React from 'react';
import { shallow } from 'enzyme';

import { HorizontalCarousel } from 'components/base';

it('renders without data', () => {
  const component = shallow(<HorizontalCarousel />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <HorizontalCarousel
      className="foo"
      children={null}
      title="foo"
      text="foo"
      buttonLabel="foo"
      buttonLink="foo"
      isReverseOrder={false}
    />
  );

  expect(component).toMatchSnapshot();
});
