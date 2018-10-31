import React from 'react';
import { shallow } from 'enzyme';

import PressBlock from 'components/PressBlock';

it('renders without data', () => {
  const component = shallow(<PressBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PressBlock
      pressItems={{
        simpleFragments: {
          foo: {
            index: 1,
            linkUrl: '/foo',
            logoImage: {
              data: 'foo',
              name: 'foo',
              size: 100,
              type: 'foo'
            },
            quote: 'foo',
            title: 'foo',
            uuid: 'foo'
          }
        }
      }}
      z={1}
      setRef={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});
