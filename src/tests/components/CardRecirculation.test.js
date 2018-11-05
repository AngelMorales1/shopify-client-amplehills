import React from 'react';
import { shallow } from 'enzyme';

import CardRecirculation from 'components/CardRecirculation';

it('renders without data', () => {
  const component = shallow(<CardRecirculation />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <CardRecirculation
      block={{
        fields: {
          card1Color: 'foo',
          card1Image: {
            fields: {
              file: {
                url: '/foo'
              }
            }
          },
          card1Link: 'foo',
          card1Text: 'foo',
          card2Color: 'foo',
          card2Image: {
            fields: {
              file: {
                url: '/foo'
              }
            }
          },
          card2Link: 'foo',
          card2Text: 'foo'
        }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
