import React from 'react';
import { shallow } from 'enzyme';

import PartyRequestFormModal from 'components/PartyRequestForm/PartyRequestFormModal';

it('renders without data', () => {
  const component = shallow(<PartyRequestFormModal />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PartyRequestFormModal onCloseClick={() => console.log('foo')} />
  );

  expect(component).toMatchSnapshot();
});
