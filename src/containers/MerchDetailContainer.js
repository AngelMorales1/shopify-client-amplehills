import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import checkout from 'state/selectors/checkout';
import allMerchandise from 'state/selectors/allMerchandise';
import merchByHandle from 'state/selectors/merchByHandle';
import merchandises from 'state/selectors/merchandises';
import merch from 'state/selectors/merch';

import get from 'utils/get';

class MerchDetailContainer extends ContainerBase {
  view = import('views/MerchDetailView');

  model = () => {};
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    allMerchandise: allMerchandise(state),
    merchByHandle: merchByHandle(state, props)
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
)(MerchDetailContainer);
