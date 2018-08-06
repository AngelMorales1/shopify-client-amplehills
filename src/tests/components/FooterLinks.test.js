import React from 'react';
import { shallow } from 'enzyme';

import FooterLinks from 'components/Footer/FooterLinks';

it('renders without data', () => {
  const component = shallow(<FooterLinks />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FooterLinks
      footerLinks={{
        facebookLink: '/foo',
        instagramLink: '/foo',
        twitterLink: '/foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
