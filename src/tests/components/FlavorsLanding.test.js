import React from 'react';
import { shallow } from 'enzyme';

import FlavorsLanding from 'components/FlavorsLanding';

it('renders without data', () => {
  const component = shallow(<FlavorsLanding />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FlavorsLanding
      flavors={{
        collectedDietaryRestrictions: [],
        collectedFilters: [],
        flavors: [
          {
            dietaryRestrictions: {},
            filters: {},
            id: '',
            image: '',
            label: '',
            title: ''
          }
        ]
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
