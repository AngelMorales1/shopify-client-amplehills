import React from 'react';
import { shallow } from 'enzyme';
import MarkdownBlock from 'components/MarkdownBlock';
it('renders without data', () => {
  const component = shallow(<MarkdownBlock />);
  expect(component).toMatchSnapshot();
});
it('renders with data', () => {
  const component = shallow(
    <MarkdownBlock
      z={0}
      block={{
        fields: {
          backgroundColor: 'foo',
          content: 'foo',
          drip: false,
          title: 'foo',
          titleLeft: true
        },
        sys: {
          contentType: {
            sys: {}
          },
          createdAt: 'foo',
          environment: {
            sys: {}
          },
          id: 'foo',
          locale: 'en-US',
          revision: 3,
          space: {
            sys: {}
          },
          type: 'foo',
          updatedAt: 'foo'
        }
      }}
    />
  );
  expect(component).toMatchSnapshot();
});
