import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import checkout from 'state/selectors/checkout';
import cakeDeposit from 'state/selectors/cakeDeposit';
import cakeLocations from 'state/selectors/cakeLocations';
import cakeAddOns from 'state/selectors/cakeAddOns';

import get from 'utils/get';

class CakeRequestFormContainer extends ContainerBase {
  view = import('views/CakeRequestFormView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    cakeLocations: cakeLocations(state),
    cakeDeposit: cakeDeposit(state),
    cakeAddOns: cakeAddOns(state)
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
)(CakeRequestFormContainer);
