import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import MiniCart from 'components/MiniCart';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <MiniCart />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
