import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import products from 'state/selectors/products';
import get from 'utils/get';

class ProfileContainer extends ContainerBase {
  view = import('views/ProfileView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    products: products(state),
    customer: get(state, 'customer')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
