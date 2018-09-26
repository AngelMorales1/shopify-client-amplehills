import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNews } from 'state/actions/newsActions';
import news from 'state/selectors/news';
import get from 'utils/get';

class NewsLandingContainer extends ContainerBase {
  view = import('views/NewsLandingView');

  model = () => {
    const {
      actions: { fetchNews }
    } = this.props;

    return fetchNews();
  };
}

const mapStateToProps = state => {
  return {
    news: news(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchNews }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsLandingContainer);
