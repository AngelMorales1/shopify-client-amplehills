import React, { Component } from 'react';
import Global from 'constants/Global';
import get from 'utils/get';

import ArticlePreview from 'components/ArticlePreview';

class NewsLandingView extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const renderArticleCount =
      this.state.currentBreakpoint === Global.breakpoints.medium.label ? 3 : 5;
    const articles = get(this, 'props.news.articles', []).slice(
      0,
      renderArticleCount
    );

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
