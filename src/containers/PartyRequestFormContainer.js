import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import { fetchPartyAddons } from 'state/actions/partyRequestFormActions';
import checkout from 'state/selectors/checkout';
import partyAddons from 'state/selectors/partyAddons';
import partyDeposit from 'state/selectors/partyDeposit';
import partyAvailableLocations from 'state/selectors/partyAvailableLocations';

import get from 'utils/get';

class PartyRequestFormContainer extends ContainerBase {
  view = import('views/PartyRequestFormView');

  model = () => {
    const { fetchPartyAddons } = this.props.actions;

    return fetchPartyAddons();
  };
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    partyAvailableLocations: partyAvailableLocations(state),
    partyAddons: partyAddons(state),
    partyDeposit: partyDeposit(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        fetchPartyAddons
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyRequestFormContainer);
