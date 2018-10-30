import React from 'react';
import { shallow } from 'enzyme';

import FlavorCarousel from 'components/FlavorCarousel';

it('renders without data', () => {
  const component = shallow(<FlavorCarousel />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FlavorCarousel
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
