import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenericPage } from 'state/actions/genericPageActions';
<<<<<<< HEAD
import { getEvents } from 'state/actions/eventsActions';
import events from 'state/selectors/events';
=======
import { getPressData } from 'state/actions/pressActions';
>>>>>>> Get press data from contentful through GenericPageContainer

import get from 'utils/get';

class GenericPageContainer extends ContainerBase {
  view = import('views/GenericPageView');

  model = () => {
<<<<<<< HEAD
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
=======
    const { getGenericPage, getPressData } = this.props.actions;
    const { path } = this.props.match;

    return Promise.all([getGenericPage(), getPressData()]).then(
      ([genericPage, press]) => {
        return {
          genericPage: get(genericPage, 'value'),
          press: get(press, 'value')
        };
      }
    );
>>>>>>> Get press data from contentful through GenericPageContainer
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
    subNavIsOn: get(
      state,
      'genericPage.genericPage.items[0].fields.subNavigation',
      false
    ),
    events: events(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage,
<<<<<<< HEAD
        getEvents
=======
        getPressData
>>>>>>> Get press data from contentful through GenericPageContainer
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
