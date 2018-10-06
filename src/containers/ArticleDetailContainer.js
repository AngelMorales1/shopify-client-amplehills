import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articles from 'state/selectors/articles';
import article from 'state/selectors/article';
import get from 'utils/get';

class ArticleDetailContainer extends ContainerBase {
  view = import('views/ArticleDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  const news = get(state, 'articles.newsArticles', []);

  return {
    newsArticles: articles(news),
    article: article(news, props)
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
)(ArticleDetailContainer);
