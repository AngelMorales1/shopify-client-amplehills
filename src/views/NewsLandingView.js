import React, { Component } from 'react';
import get from 'utils/get';

import ArticlePreview from 'components/ArticlePreview';

class NewsLandingView extends Component {
  render() {
    const articles = get(this, 'props.news.articles', []);

    return (
      <div>
        <div>
          {articles.map((article, i) => (
            <ArticlePreview index={i} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsLandingView;
