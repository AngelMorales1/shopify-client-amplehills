import React from 'react';
import { shallow } from 'enzyme';

import OurPledge from 'components/OurPledge';

it('renders without data', () => {
  const component = shallow(<OurPledge />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <OurPledge
      actions={{}}
      ourPledgeOverlayIsOpen={false}
      overlayContentImage={{
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
      }}
      shippingInformation={'foo'}
      shippingPledge={'foo'}
      calloutImage={{
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
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
