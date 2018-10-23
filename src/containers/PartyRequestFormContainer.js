import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IDLE } from 'constants/Status';

import { addLineItems } from 'state/actions/checkoutActions';
import checkout from 'state/selectors/checkout';
import products from 'state/selectors/products';
import product from 'state/selectors/product';
import partyAvailableLocations from 'state/selectors/partyAvailableLocations';

import get from 'utils/get';

class PartyRequestFormContainer extends ContainerBase {
  view = import('views/PartyRequestFormView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    formStatus: get(state, 'status.contactUsFormStatus', IDLE),
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    partyAvailableLocations: partyAvailableLocations(state)
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
