import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchArticles,
  fetchArticlesTags
} from 'state/actions/articlesActions';
import articles from 'state/selectors/articles';
import lastCursorPerPage from 'state/selectors/lastCursorPerPage';
import articlesTags from 'state/selectors/articlesTags';
import get from 'utils/get';

class ArticlesLandingContainer extends ContainerBase {
  view = import('views/ArticlesLandingView');

  model = () => {
    const {
      actions: { fetchArticles, fetchArticlesTags, fetchCursor }
    } = this.props;

    return Promise.all([fetchArticles(), fetchArticlesTags()]).then(
      ([articles, articlesTags]) => {
        const articlesData = get(articles, 'value.data.articles', {});

        return {
          articles: get(articles, 'value'),
          articlesTags: get(articlesTags, 'value')
        };
      }
    );
  };
}

const mapStateToProps = state => {
  return {
    articles: articles(state),
    articlesTags: articlesTags(state),
    cursors: get(state, 'articles.cursors', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchArticles,
        fetchArticlesTags
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesLandingContainer);
