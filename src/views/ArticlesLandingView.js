import React, { Component } from 'react';
import ArticlesLanding from 'components/ArticlesLanding';
import ErrorPage from 'components/ErrorPage';
import get from 'utils/get';

class ArticlesLandingView extends Component {
  render() {
    const { model, actions } = this.props;

    if (model.isError) return <ErrorPage />;

    return (
      <ArticlesLanding
        articles={get(this, 'props.newsArticles', [])}
        tags={get(this, 'props.newsArticlesTags', {})}
        actions={actions}
        selectedTags={get(this, 'props.selectedTags', [])}
        articlesByTags={get(this, 'props.articlesByTags', [])}
      />
    );
  }
}

export default ArticlesLandingView;
