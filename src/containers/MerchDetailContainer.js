import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import checkout from 'state/selectors/checkout';
import allMerchandise from 'state/selectors/allMerchandise';
import merchByHandle from 'state/selectors/merchByHandle';
import { fetchContentfulMerch } from 'state/actions/productsActions';

import get from 'utils/get';

class MerchDetailContainer extends ContainerBase {
  view = import('views/MerchDetailView');

  model = () => {
    const {
      actions: { fetchContentfulMerch }
    } = this.props;

    return fetchContentfulMerch();
  };
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    allMerchandise: allMerchandise(state),
    merch: merchByHandle(state, props)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        fetchContentfulMerch
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchDetailContainer);
