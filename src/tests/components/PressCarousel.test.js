import React from 'react';
import { shallow } from 'enzyme';

import PressCarousel from 'components/PressCarousel';

it('renders without data', () => {
  const component = shallow(<PressCarousel />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PressCarousel
      block={{
        fields: {
          buttonLabel: 'foo',
          buttonLink: 'foo',
          pressItems: {
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
          },
          customOrder: false,
          drip: false,
          sortByLatest: true,
          title: 'foo'
        },
        sys: {
          id: 'foo'
        }
      }}
      z={0}
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
