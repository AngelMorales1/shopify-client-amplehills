import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import get from 'utils/get';

class PrivacyPolicyContainer extends ContainerBase {
  view = import('views/PrivacyPolicyView');

  model = () => {};
}

const mapStateToProps = state => {
  return {
    privacyPolicy: get(
      state,
      'applicationUI.privacyPolicy.items[0].fields.privacyPolicyContent[0].fields',
      {}
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacyPolicyContainer);
