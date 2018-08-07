import React from 'react';
import { shallow } from 'enzyme';

import ImageText from 'components/ImageText';

it('renders without data', () => {
  const component = shallow(<ImageText />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ImageText
      z={0}
      block={{
        fields: {
          title: 'foo',
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
              environment: {
                sys: {
                  id: 'foo',
                  type: 'foo',
                  linkType: 'foo'
                }
              },
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
          text: 'foo',
          imagePosition: 0,
          backgroundColor: 'foo'
        }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
