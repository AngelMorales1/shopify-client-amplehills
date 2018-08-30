import React from 'react';
import { shallow } from 'enzyme';

import Alert from 'components/Alert';

it('renders without data', () => {
  const component = shallow(<Alert />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Alert
      alert={{
<<<<<<< HEAD
        alertCopy: 'foo',
        linkCopy: 'foo',
        linkUrl: 'foo',
        title: 'foo'
=======
        fields: {
          alertCopy: 'foo',
          linkCopy: 'foo',
          linkUrl: '/foo',
          title: 'foo'
        },
        sys: {
          contentType: {
            sys: {}
          },
          createdAt: 'foo',
          environment: {
            sys: {}
          },
          id: 'foo',
          locale: 'foo',
          revision: 1,
          space: {
            sys: {}
          },
          type: 'foo',
          updatedAt: 'foo'
        }
>>>>>>> Add Alert component test
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
