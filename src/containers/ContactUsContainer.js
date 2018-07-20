import ContainerBase from 'lib/ContainerBase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendContactForm } from 'state/actions/ui/contactUIActions';
import { IDLE } from 'constants/Status';

import get from 'utils/get';

class ProfileContainer extends ContainerBase {
  view = import('views/ContactUsView');
}

const mapStateToProps = state => {
  return {
    formStatus: get(state, 'contactUI.formStatus', IDLE)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        sendContactForm
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
