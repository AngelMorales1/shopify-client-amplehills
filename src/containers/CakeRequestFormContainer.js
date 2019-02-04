import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addLineItems } from 'state/actions/checkoutActions';
import { getFlavors } from 'state/actions/flavorsActions';
import checkout from 'state/selectors/checkout';
import cakeDeposit from 'state/selectors/cakeDeposit';
import cakeLocations from 'state/selectors/cakeLocations';
import cakeFlavors from 'state/selectors/cakeFlavors';
import cakeToppings from 'state/selectors/cakeToppings';
import cakeFillings from 'state/selectors/cakeFillings';
import cakeSprinkles from 'state/selectors/cakeSprinkles';
import cakeSigns from 'state/selectors/cakeSigns';
import cakeSizes from 'state/selectors/cakeSizes';
import cakeRecommendations from 'state/selectors/cakeRecommendations';

import get from 'utils/get';

class CakeRequestFormContainer extends ContainerBase {
  view = import('views/CakeRequestFormView');

  model = () => {
    const { actions } = this.props;

    return actions.getFlavors();
  };
}

const mapStateToProps = (state, props) => {
  return {
    checkout: checkout(state),
    addLineItemsStatus: get(state, 'status.addLineItemsStatus'),
    cakeLocations: cakeLocations(state),
    cakeDeposit: cakeDeposit(state),
    cakeFlavors: cakeFlavors(state),
    cakeToppings: cakeToppings(state),
    cakeFillings: cakeFillings(state),
    cakeSprinkles: cakeSprinkles(state),
    cakeSigns: cakeSigns(state),
    cakeSizes: cakeSizes(state),
    cakeRecommendations: cakeRecommendations(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addLineItems,
        getFlavors
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CakeRequestFormContainer);
