import React, { Component } from 'react';
import NewsLanding from 'components/NewsLanding';
import get from 'utils/get';

class NewsLandingView extends Component {
  render() {
    const { model, actions } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const news = get(this, 'props.news', {});
    const cursors = get(this, 'props.cursors', []);

    return <NewsLanding news={news} actions={actions} cursors={cursors} />;
  }
}

export default NewsLandingView;
