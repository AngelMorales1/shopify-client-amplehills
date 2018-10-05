import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articles from 'state/selectors/articles';
import articlesTags from 'state/selectors/articlesTags';
import get from 'utils/get';

class ArticlesLandingContainer extends ContainerBase {
  view = import('views/ArticlesLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  const news = get(state, 'articles.newsArticles', []);

  return {
    newsArticles: articles(news),
    newsArticlesTags: articlesTags(news)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesLandingContainer);
