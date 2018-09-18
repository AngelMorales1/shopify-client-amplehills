import React from 'react';
import { shallow } from 'enzyme';

import ImageVideoCarousel from 'components/ImageVideoCarousel';

it('renders without data', () => {
  const component = shallow(<ImageVideoCarousel />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ImageVideoCarousel
      z={0}
      block={{
        fields: {
          title: 'foo',
          drip: false,
          contents: [
            {
              sys: {
                id: 'foo'
              },
              fields: {
                description: 'foo',
                file: {
                  url: 'foo'
                },
                title: 'foo'
              }
            }
          ]
        }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
