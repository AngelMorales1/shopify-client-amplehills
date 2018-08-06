import React from 'react';
import { shallow } from 'enzyme';

import BlockSwitch from 'components/BlockSwitch';

it('renders without data', () => {
  const component = shallow(<BlockSwitch />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <BlockSwitch
      actions={{ foo: () => console.log('foo') }}
      addLineItemsStatus={'foo'}
      block={{
        fields: {
          backgroundColor: 'foo',
          image: {
            sys: {
              createdAt: 'foo',
              environment: { foo: 'foo' },
              id: 'foo',
              locale: 'foo',
              revision: 0,
              space: { sys: {} },
              type: 'Asset',
              updatedAt: 'foo'
            },
            fields: {
              file: {
                url: 'foo'
              },
              title: 'foo'
            }
          },
          text1: 'foo',
          text2: 'foo',
          title: 'foo',
          title1: 'foo',
          title2: 'foo'
        },
        sys: {
          contentType: { sys: {} },
          createdAt: 'foo',
          environment: { sys: {} },
          id: 'foo',
          locale: 'foo',
          revision: 0,
          space: { sys: {} },
          type: 'foo',
          updatedAt: 'foo'
        }
      }}
      checkout={{
        completedAt: null,
        currencyCode: 'foo',
        id: 'foo',
        lineItems: [{ foo: {} }],
        note: null,
        subtotalPrice: '0',
        totalPrice: '0'
      }}
      error={null}
      globalSettings={{
        facebookLink: 'foo',
        footerIllustration: { sys: {}, fields: {} },
        instagramLink: 'foo',
        ourPledgeIcon: { sys: {}, fields: {} },
        shipping2: 'foo',
        shippingDates: 'foo',
        title: 'foo',
        twitterLink: 'foo'
      }}
      history={{
        action: 'foo',
        block: () => console.log('foo'),
        createHref: () => console.log('foo'),
        go: () => console.log('foo'),
        goBack: () => console.log('foo'),
        goForward: () => console.log('foo'),
        length: 0,
        listen: () => console.log('foo'),
        location: {
          pathname: 'foo',
          search: '',
          hash: '',
          state: undefined,
          key: 'foo'
        },
        push: () => console.log('foo'),
        replace: () => console.log('foo')
      }}
      location={{
        hash: 'foo',
        key: 'foo',
        pathname: '/foo',
        search: 'foo',
        state: undefined
      }}
      match={{
        isExact: true,
        params: {
          productHandle: 'foo'
        },
        path: '/foo',
        url: '/foo'
      }}
      model={{
        action: {
          type: 'foo',
          payload: {}
        },
        isError: false,
        value: {
          sys: {},
          total: 0,
          skip: 0,
          limit: 0,
          items: []
        }
      }}
      ourPledge={{
        calloutImage: { sys: {}, fields: {} },
        overlayContentImage: { sys: {}, fields: {} },
        shippingInformation: 'foo',
        shippingPledge: 'foo',
        title: 'foo'
      }}
      ourPledgeOverlayIsOpen={false}
      product={{
        available: true,
        blocks: [{}],
        cartDetails: 'foo',
        description: 'foo',
        flavorDescription: 'foo',
        gridImage: 'foo',
        handle: 'foo',
        id: 'foo',
        pintImage: 'foo',
        price: 0,
        subItems: [],
        subItemsAvailable: true,
        title: 'foo',
        variants: [{}]
      }}
      products={{ foo: {} }}
      staticContext={undefined}
      view={() => console.log('foo')}
      z={0}
    />
  );

  expect(component).toMatchSnapshot();
});
