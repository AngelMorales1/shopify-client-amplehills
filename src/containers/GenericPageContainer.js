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
    const genericPageSlug = get(this, 'props.match.params.genericPageSlug', '');

    if (genericPageSlug === 'style-guide') {
      if (!isStaging()) {
        return;
      }
    }

    return Promise.all([
      getGenericPage(`${!!genericPageSlug ? genericPageSlug : 'home'}`),
      getEvents(),
      getFlavors(),
      fetchShopifyWholesaleProducts()
    ]).then(([genericPage, events, flavor, wholesaleProduct]) => {
      return {
        genericPage: get(genericPage, 'value'),
        events: get(events, 'value'),
        flavor: get(flavor, 'value'),
        wholesaleProduct: get(wholesaleProduct, 'value')
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
    events: events(state),
    flavors: flavors(state),
    pageNotFound: !get(state, 'genericPage.genericPage.name', ''),
    wholesaleProducts: wholesaleProducts(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getGenericPage,
        getEvents,
        getFlavors,
        fetchShopifyWholesaleProducts
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericPageContainer);
