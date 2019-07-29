import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGenericPage } from 'state/actions/genericPageActions';
import { getEvents } from 'state/actions/eventsActions';
import { fetchShopifyWholesaleProducts } from 'state/actions/wholesaleActions';
import events from 'state/selectors/events';
import wholesaleProducts from 'state/selectors/wholesaleProducts';
import { getFlavors } from 'state/actions/flavorsActions';
import flavors from 'state/selectors/flavors';

import get from 'utils/get';
import isStaging from 'utils/isStaging';

class GenericPageContainer extends ContainerBase {
  view = import('views/GenericPageView');

  model = () => {
    const {
      getGenericPage,
      getEvents,
      fetchShopifyWholesaleProducts,
      getFlavors
    } = this.props.actions;
    const { path } = this.props.match;
    const generichPageSlug = get(
      this,
      'props.match.params.genericPageSlug',
      ''
    );

    if (generichPageSlug === 'style-guide') {
      if (!isStaging()) {
        return;
      }
    }

    return Promise.all([
      getGenericPage(`/${generichPageSlug}`),
      getEvents(),
      fetchShopifyWholesaleProducts(),
      getFlavors()
    ]).then(([genericPage, events, wholesaleProduct, flavor]) => {
      return {
        genericPage: get(genericPage, 'value'),
        events: get(events, 'value'),
        wholesaleProduct: get(wholesaleProduct, 'value'),
        flavor: get(flavor, 'value')
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
    subNavIsOn: get(
      state,
      'genericPage.genericPage.items[0].fields.subNavigation',
      false
    ),
    events: events(state),
    wholesaleProducts: wholesaleProducts(state),
    flavors: flavors(state),
    pageNotFound: !get(state, 'genericPage.genericPage.items', []).length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage,
        getEvents,
        fetchShopifyWholesaleProducts,
        getFlavors
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
