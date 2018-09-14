import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEvents } from 'state/actions/eventsActions';
import events from 'state/selectors/events';
import event from 'state/selectors/event';

class EventDetailContainer extends ContainerBase {
  view = import('views/EventDetailView');

  model = () => {
    const {
      actions: { getEvents }
    } = this.props;

    return getEvents();
  };
}

const mapStateToProps = (state, props) => {
  console.log(event(state, props));
  return {
    event: event(state, props),
    events: events(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getEvents
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailContainer);
