import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import Cart from 'components/Cart';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
