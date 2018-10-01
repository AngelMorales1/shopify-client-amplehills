import React, { Component } from 'react';
import Global from 'constants/Global';
import get from 'utils/get';
import cx from 'classnames';

import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

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
    const windowSizeIsMedium =
      this.state.currentBreakpoint === Global.breakpoints.medium.label;
    const articles = get(this, 'props.news.articles', []);

    return (
      <div
        className={cx('flex flex-row justify-between py4 px2', {
          'flex-column': !windowSizeIsMedium
        })}
      >
        <div className="col-12 md-col-3 px2">
          <h2 className="callout mb2">Recent Articles</h2>
          <div className={cx('flex flex-column', { mb3: !windowSizeIsMedium })}>
            {articles
              .slice(0, 4)
              .map((article, i) => (
                <RecentArticle key={article.id} article={article} />
              ))}
          </div>
        </div>
        <div className="col-12 md-col-6">
          {articles
            .map((article, i) => (
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
