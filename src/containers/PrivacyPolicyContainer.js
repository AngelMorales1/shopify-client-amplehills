import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(PrivacyPolicyContainer);
