import React from 'react';
import { shallow } from 'enzyme';
import GenericHero from 'components/GenericHero';
it('renders without data', () => {
  const component = shallow(<GenericHero />);
  expect(component).toMatchSnapshot();
});
it('renders with data', () => {
  const component = shallow(
    <GenericHero
      z={0}
      block={{
        fields: {
          title: 'foo',
          color: 'foo',
          drip: false,
          text: 'foo',
          buttonLabel: 'foo',
          buttonLink: '/foo',
          ImageRight: false,
          isReverseArrangement: false,
          image1: {
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
            image2: {
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
              }
            }
          }
        }
      }}
    />
  );
  expect(component).toMatchSnapshot();
});
