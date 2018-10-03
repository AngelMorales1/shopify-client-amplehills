import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchArticles,
  fetchArticlesTags,
  fetchArticlesByTag
} from 'state/actions/newsActions';
import news from 'state/selectors/news';
import newsTags from 'state/selectors/newsTags';
import get from 'utils/get';

class NewsLandingContainer extends ContainerBase {
  view = import('views/NewsLandingView');

  model = () => {
    const {
      actions: { fetchArticles, fetchArticlesTags }
    } = this.props;

    return Promise.all([fetchArticles(), fetchArticlesTags()]).then(
      ([news, newsTags]) => {
        return {
          news: get(news, 'value'),
          newsTags: get(newsTags, 'value')
        };
      }
    );
  };
}

const mapStateToProps = state => {
  return {
    news: news(state),
    newsTags: newsTags(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchArticles,
        fetchArticlesTags,
        fetchArticlesByTag
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsLandingContainer);
