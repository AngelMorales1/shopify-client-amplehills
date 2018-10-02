import React from 'react';
import { shallow } from 'enzyme';

import ArticlePreview from 'components/ArticlePreview';

it('renders without data', () => {
  const component = shallow(<ArticlePreview />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ArticlePreview
      article={{
        authorEmail: 'foo',
        authorName: 'foo',
        content: 'foo',
        contentHtml: 'foo',
        cursor: 'foo',
        handle: 'foo',
        id: 'foo',
        image: 'foo',
        publishedAt: 'foo',
        tags: ['foo'],
        title: 'foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});
