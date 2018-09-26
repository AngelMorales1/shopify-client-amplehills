import React, { Component } from 'react';
import get from 'utils/get';

import ArticlePreview from 'components/ArticlePreview';

class NewsLandingView extends Component {
  render() {
    const articles = get(this, 'props.news.articles', []);

    return (
      <div className="flex flex-row justify-between py4 px2">
        <div className="col-12 md-col-6">
          {articles.map((article, i) => (
            <ArticlePreview
              key={get(article, 'id', i)}
              index={i}
              article={article}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsLandingView;
