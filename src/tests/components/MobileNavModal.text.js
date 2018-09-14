import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import MobileNavModal from 'components/MobileNavModal';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <MobileNavModal />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
