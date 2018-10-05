import React, { Component } from 'react';
import ArticlesLanding from 'components/ArticlesLanding';
import get from 'utils/get';

class ArticlesLandingView extends Component {
  render() {
    const { model, actions } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const tags = get(this, 'props.newsArticlesTags', {});
    const articles = get(this, 'props.newsArticles', []);

    return (
      <ArticlesLanding articles={articles} tags={tags} actions={actions} />
    );
  }
}

export default ArticlesLandingView;
