import React from 'react';
import { shallow } from 'enzyme';

import NewsletterModal from 'components/NewsletterModal';

it('renders without data', () => {
  const component = shallow(<NewsletterModal />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <NewsletterModal
      subscribeNewsletterTitle={'foo'}
      subscribeNewsletterDescription={'foo'}
    />
  );

  expect(component).toMatchSnapshot();
});
