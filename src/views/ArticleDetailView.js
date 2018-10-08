import React, { Component } from 'react';
import ArticleDetail from 'components/ArticleDetail';
import get from 'utils/get';

class ArticleDetailView extends Component {
  render() {
    const { model, article, newsArticles } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <ArticleDetail article={article} newsArticles={newsArticles} />;
  }
}

export default ArticleDetailView;
