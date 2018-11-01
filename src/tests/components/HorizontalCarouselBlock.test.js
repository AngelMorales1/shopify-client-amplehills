import React from 'react';
import { shallow } from 'enzyme';

import HorizontalCarouselBlock from 'components/HorizontalCarouselBlock';

it('renders without data', () => {
  const component = shallow(<HorizontalCarouselBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <HorizontalCarouselBlock
      block={{
        fields: {
          buttonLabel: 'foo',
          buttonLink: 'foo',
          drip: false,
          title: 'foo',
          flavorItems: []
        },
        sys: {
          id: 'foo'
        }
      }}
      z={0}
      setRef={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});
