import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import checkout from 'state/selectors/checkout';
import partyDeposit from 'state/selectors/partyDeposit';
import partyAvailableLocations from 'state/selectors/partyAvailableLocations';
import partyAddOns from 'state/selectors/partyAddOns';

import get from 'utils/get';

class PartyRequestFormContainer extends ContainerBase {
  view = import('views/PartyRequestFormView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    partyAvailableLocations: partyAvailableLocations(state),
    partyDeposit: partyDeposit(state),
    partyAddOns: partyAddOns(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartyRequestFormContainer);
