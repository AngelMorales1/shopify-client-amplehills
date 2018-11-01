import React from 'react';
import { shallow } from 'enzyme';

import PressCarouselCards from 'components/PressCarouselCards';

it('renders without data', () => {
  const component = shallow(<PressCarouselCards />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PressCarouselCards
      pressItemsInBlock={{
        fragments: [
          [
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' }
          ]
        ],
        simpleFragments: { foo: {} }
      }}
      pressItems={{
        fragments: [
          [
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' },
            { key: 'foo', value: 'foo' }
          ]
        ],
        simpleFragments: { foo: {} }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
