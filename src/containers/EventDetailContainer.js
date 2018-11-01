import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendContactForm } from 'state/actions/ui/contactUIActions';
import get from 'utils/get';

import { getEvents } from 'state/actions/eventsActions';
import { addLineItems } from 'state/actions/checkoutActions';
import events from 'state/selectors/events';
import event from 'state/selectors/event';
import checkout from 'state/selectors/checkout';
import { IDLE } from 'constants/Status';
import cardsBlock from 'state/selectors/cardsBlock';

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
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    event: event(state, props),
    events: events(state),
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems'
    ),
    formStatus: get(state, 'status.contactUsFormStatus', IDLE)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        getEvents,
        sendContactForm
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailContainer);
