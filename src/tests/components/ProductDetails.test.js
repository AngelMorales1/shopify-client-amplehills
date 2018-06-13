import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from 'components/ProductDetails';
import contentful from './data/ProductDetails.contentful.js';

it('renders without data', () => {
  const component = shallow(<ProductDetails />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<ProductDetails data={contentful} z={1} />);

  expect(component).toMatchSnapshot();
});
