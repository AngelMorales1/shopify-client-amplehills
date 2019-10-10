import React, { Component } from 'react';
import ArticleDetail from 'components/ArticleDetail';
import ErrorPage from 'components/ErrorPage';

class ArticleDetailView extends Component {
  render() {
    const { model, article, newsArticles } = this.props;
    if (model.isError) return <ErrorPage />;

    return <ArticleDetail article={article} newsArticles={newsArticles} />;
  }
}

export default ArticleDetailView;
