import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventPage } from 'state/actions/eventPageActions';
// import pressItems from 'state/selectors/pressItems';

import get from 'utils/get';

class EventDetailContainer extends ContainerBase {
  view = import('views/EventDetailView');

  model = () => {
    const {
      actions: { getEventPage }
    } = this.props;
    console.log('>>>', this.props);
    // const { path } = this.props.match;

    return getEventPage();
  };
}

const mapStateToProps = (state, props) => {
  console.log(props);
  return {
    eventPageData: get(state, '')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getEventPage
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailContainer);
