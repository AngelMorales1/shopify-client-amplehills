import React from 'react';
import { shallow } from 'enzyme';

import FAQBlock from 'components/FAQBlock';

it('renders without data', () => {
  const component = shallow(<FAQBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FAQBlock
      z={0}
      block={{
        fields: {
          title: 'foo',
          buttonLabel: 'foo',
          buttonLink: 'foo',
          headingAndQa: {
            fragments: [
              [
                {
                  key: 'foo',
                  value: 'foo'
                },
                {
                  key: 'foo',
                  type: 'foo',
                  value: 'foo',
                  _schemaRef: 'foo'
                },
                {
                  key: 'foo',
                  type: 'foo',
                  value: null,
                  _schemaRef: 'foo'
                },
                {
                  key: 'foo',
                  type: 'foo',
                  value: null,
                  _schemaRef: 'foo'
                },
                {
                  key: 'foo',
                  type: 'foo',
                  value: 'foo',
                  _schemaRef: 'foo'
                }
              ]
            ]
          }
        }
      }}
      setRef={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});
