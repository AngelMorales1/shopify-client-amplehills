import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNews, fetchCursor } from 'state/actions/newsActions';
import news from 'state/selectors/news';
import cursor from 'state/selectors/cursor';
import newsPagination from 'state/selectors/newsPagination';
import get from 'utils/get';

class NewsLandingContainer extends ContainerBase {
  view = import('views/NewsLandingView');

  model = () => {
    const {
      actions: { fetchNews, fetchCursor }
    } = this.props;

    const getCursor = (lastItemCursor, hasNextPage) => {
      if (hasNextPage) {
        const fetchCursor = get(this, 'props.actions.fetchCursor', () => {});

        fetchCursor(lastItemCursor).then(res => {
          const articles = get(res, 'value.data.articles', {});
          const lastCursor = get(articles, 'edges[4].cursor', '');
          const nextPage = get(articles, 'pageInfo.hasNextPage', false);

          return getCursor(lastCursor, nextPage);
        });
      }
    };

    return Promise.all([fetchNews()]).then(([news]) => {
      const articles = get(news, 'value.data.articles', {});

      return {
        news: get(news, 'value'),
        cursors: get(articles, 'pageInfo.hasNextPage', false)
          ? getCursor(get(articles, 'edges[4].cursor', ''), true)
          : []
      };
    });
  };
}

const mapStateToProps = state => {
  return {
    news: news(state),
    cursors: cursor(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchNews, fetchCursor }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsLandingContainer);
