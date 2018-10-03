import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchArticles,
  fetchArticlesTags,
  fetchArticlesByTag
} from 'state/actions/articlesActions';
import articles from 'state/selectors/articles';
import articlesTags from 'state/selectors/articlesTags';
import get from 'utils/get';

class ArticlesLandingContainer extends ContainerBase {
  view = import('views/ArticlesLandingView');

  model = () => {
    const {
      actions: { fetchArticles, fetchArticlesTags }
    } = this.props;

    return Promise.all([fetchArticles(), fetchArticlesTags()]).then(
      ([articles, articlesTags]) => {
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
    articlesTags: articlesTags(state)
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
)(ArticlesLandingContainer);
