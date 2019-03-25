import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import NewsletterModal from 'components/NewsletterModal';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <NewsletterModal />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
