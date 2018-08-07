import React from 'react';
import { shallow } from 'enzyme';

import ImageDoubleText from 'components/ImageDoubleText';

it('renders without data', () => {
  const component = shallow(<ImageDoubleText />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ImageDoubleText
      z={0}
      block={{
        image: {
          sys: {
            space: {
              sys: {
                type: 'foo',
                linkType: 'foo',
                id: 'foo'
              }
            },
            id: 'foo',
            type: 'foo',
            createdAt: 'foo',
            updatedAt: 'foo',
            environment: { foo: {} },
            revision: 0,
            locale: 'foo'
          },
          fields: {
            title: 'foo',
            file: {
              url: 'foo',
              details: {
                size: 0,
                image: {
                  width: 0,
                  height: 0
                }
              },
              fileName: 'foo',
              contentType: 'foo'
            }
          }
        },
        backgroundColor: 'foo',
        title1: 'foo',
        title2: 'foo',
        text1: 'foo',
        text2: 'foo',
        title: 'foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
