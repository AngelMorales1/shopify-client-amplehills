import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenericPage } from 'state/actions/genericPageActions';
import { getEvents } from 'state/actions/eventActions';
import events from 'state/selectors/events';

import get from 'utils/get';

class GenericPageContainer extends ContainerBase {
  view = import('views/GenericPageView');

  model = () => {
    const { getGenericPage, getEvents } = this.props.actions;
    const { path } = this.props.match;

    return Promise.all(
      [getGenericPage(path), getEvents()]
    ).then(([genericPage, events]) => {
      return {
        genericPage: get(genericPage, 'value'),
        events: get(events, 'value')
      };
    });
  };
}

const mapStateToProps = state => {
  return {
    blocks: get(
      state,
      'genericPage.genericPage.items[0].fields.contentBlocks',
      []
    ),
    pressItems: get(
      state,
      'applicationUI.globalSettings.items[0].fields.pressItems'
    ),
    events: events(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage,
        getEvents
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
