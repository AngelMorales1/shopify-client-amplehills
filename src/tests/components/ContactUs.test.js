import React from 'react';
import { shallow } from 'enzyme';

import ContactUs from 'components/ContactUs';

it('renders without data', () => {
  const component = shallow(<ContactUs />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ContactUs
      param={''}
      actions={{ sendContactForm: () => console.log('foo') }}
      addLineItemsStatus={'foo'}
      formStatus={'foo'}
      error={null}
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
      staticContext={undefined}
      view={() => console.log('foo')}
      z={0}
    />
  );

  expect(component).toMatchSnapshot();
});
