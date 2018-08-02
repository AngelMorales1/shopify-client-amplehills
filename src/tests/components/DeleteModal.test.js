import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import DeleteModal from 'components/DeleteModal';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <DeleteModal />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
