import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventPage } from 'state/actions/eventPageActions';
import event from 'state/selectors/event';

import get from 'utils/get';

class EventDetailContainer extends ContainerBase {
  view = import('views/EventDetailView');

  model = () => {
    const {
      actions: { getEventPage }
    } = this.props;

    return getEventPage();
  };
}

const mapStateToProps = (state, props) => {
  return {
    eventPageData: get(state, 'eventPage.eventPageData', {}),
    event: event(state, props)
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
