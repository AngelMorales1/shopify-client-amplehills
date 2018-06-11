import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';

import { store } from 'store';
import App from 'App';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
