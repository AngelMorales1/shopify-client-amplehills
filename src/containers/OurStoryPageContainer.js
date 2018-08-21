import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getOurStoryData } from 'state/actions/ourStoryActions';

import get from 'utils/get';

class OurStoryPageContainer extends ContainerBase {
  view = import('views/OurStoryPageView');

  model = () => {
    const { getOurStoryData } = this.props.actions;

    return getOurStoryData();
  };
}

const mapStateToProps = (state, props) => {
  const fields = get(state, 'ourStory.ourStory.items[0].fields', {});

  return {
    image: get(fields, 'image', {}),
    title: get(fields, 'title', ''),
    block: get(fields, 'contentBlock', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getOurStoryData
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OurStoryPageContainer);
