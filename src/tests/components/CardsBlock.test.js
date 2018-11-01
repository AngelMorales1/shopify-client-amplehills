import React from 'react';
import { shallow } from 'enzyme';

import CardsBlock from 'components/CardsBlock';

it('renders without data', () => {
  const component = shallow(<CardsBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <CardsBlock
      cardBlock1={{
        color: 'foo',
        image: 'foo',
        link: 'foo',
        text: 'foo'
      }}
      cardBlock2={{
        color: 'foo',
        image: 'foo',
        link: 'foo',
        text: 'foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
