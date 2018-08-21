import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getOurStoryPage } from 'state/actions/ourStoryPageActions';

import get from 'utils/get';

class OurStoryPageContainer extends ContainerBase {
  view = import('views/OurStoryPageView');

  model = () => {
    const { getOurStoryPage } = this.props.actions;

    return getOurStoryPage();
  };
}

const mapStateToProps = (state, props) => {
  const fields = get(
    state,
    'ourStoragePage.ourStoragePage.items[0].fields',
    {}
  );

  return {
    image: get(fields, 'image', {}),
    title: get(fields, 'title', ''),
    color: get(fields, 'color', 'yellow'),
    blocks: get(fields, 'contentBlock', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getOurStoryPage
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OurStoryPageContainer);
