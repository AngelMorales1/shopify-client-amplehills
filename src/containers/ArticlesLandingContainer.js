import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articles from 'state/selectors/articles';
import articlesTags from 'state/selectors/articlesTags';
import {
  removeSelectedTag,
  addSelectedTag
} from 'state/actions/articlesActions';
import get from 'utils/get';

class ArticlesLandingContainer extends ContainerBase {
  view = import('views/ArticlesLandingView');

  model = () => {};
}

const mapStateToProps = state => {
  const news = get(state, 'articles.newsArticles', []);

  return {
    newsArticles: articles(news),
    newsArticlesTags: articlesTags(news),
    selectedTags: get(state, 'articles.selectedTags', []),
    articlesByTags: articles(get(state, 'articles.articlesByTags', []))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ removeSelectedTag, addSelectedTag }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesLandingContainer);
