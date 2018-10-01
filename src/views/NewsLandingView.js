import React, { Component } from 'react';
import NewsLanding from 'components/NewsLanding';
import get from 'utils/get';

class NewsLandingView extends Component {
  render() {
    const { model, actions } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const tags = Object.keys(get(this, 'props.newsTags', {}));
    const news = get(this, 'props.news', {});

    return <NewsLanding news={news} tags={tags} actions={actions} />;
  }
}

export default NewsLandingView;
