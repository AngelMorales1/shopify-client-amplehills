import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import App from 'App';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
