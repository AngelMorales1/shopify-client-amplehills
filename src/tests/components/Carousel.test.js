import React from 'react';
import { shallow } from 'enzyme';

import { Carousel } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Carousel />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Carousel
      className="foo"
      showArrows={true}
      showDots={true}
      arrowPreviousImage="/assets/images/icon-circle-left-arrow.svg"
      arrowNextImage="/assets/images/icon-circle-right-arrow.svg"
      onChange={() => console.log('foo')}
      index={0}
    />
  );

  expect(component).toMatchSnapshot();
});
