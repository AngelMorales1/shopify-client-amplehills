import React from 'react';
import { shallow } from 'enzyme';
import MultipleImageText from 'components/MultipleImageText';
it('renders without data', () => {
  const component = shallow(<MultipleImageText />);
  expect(component).toMatchSnapshot();
});
it('renders with data', () => {
  const component = shallow(
    <MultipleImageText
      setRef={() => console.log('foo')}
      z={1}
      drip={false}
      block={{
        fields: {
          contentType: 'foo',
          MultipleImageText: {
            simpleFragments: {
              foo: {
                image: { data: 'foo' },
                text: 'foo'
              }
            }
          }
        }
      }}
    />
  );
  expect(component).toMatchSnapshot();
});
