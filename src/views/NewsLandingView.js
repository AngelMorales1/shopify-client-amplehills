import React, { Component } from 'react';
import NewsLanding from 'components/NewsLanding';
import ErrorPage from 'components/ErrorPage';
import get from 'utils/get';

class NewsLandingView extends Component {
  render() {
    const { model, actions } = this.props;
    if (model.isError) return <ErrorPage />;

    const news = get(this, 'props.news', {});
    const cursors = get(this, 'props.cursors', []);

    return <NewsLanding news={news} actions={actions} cursors={cursors} />;
  }
}

export default NewsLandingView;
