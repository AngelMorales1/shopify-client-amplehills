import React from 'react';
import { shallow } from 'enzyme';

import OurPledgeOverlay from 'components/OurPledgeOverlay';

it('renders without data', () => {
  const component = shallow(<OurPledgeOverlay />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <OurPledgeOverlay
      closeOurPledgeOverlay={() => console.log('foo')}
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
      ourPledgeOverlayIsOpen={false}
    />
  );

  expect(component).toMatchSnapshot();
});
