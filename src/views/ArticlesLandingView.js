import React, { Component } from 'react';
import ArticlesLanding from 'components/ArticlesLanding';
import get from 'utils/get';

class ArticlesLandingView extends Component {
  render() {
    const { model, actions } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const tags = Object.keys(get(this, 'props.articlesTags', {}));
    const articles = get(this, 'props.articles', {});
    const cursors = get(this, 'props.cursors', []);

    return (
      <ArticlesLanding
        articles={articles}
        tags={tags}
        actions={actions}
        cursors={cursors}
      />
    );
  }
}

export default ArticlesLandingView;
