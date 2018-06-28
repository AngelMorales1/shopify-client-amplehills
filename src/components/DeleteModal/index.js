import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  confirmRemoveLineItems,
  cancelRemoveLineItems
} from 'state/actions/checkoutActions';

import { Button } from 'components/base';
import cx from 'classnames';
import get from 'utils/get';
import styles from './DeleteModal.scss';

class DeleteModal extends Component {
  confirmRemoveLineItems = item => {
    const items = [item];
    const { actions } = this.props;
    actions.confirmRemoveLineItems(get(this.props, 'checkout.id', null), items);
  };

  render() {
    const classes = cx(
      'fixed-cover bg-white-wash flex justify-center items-center',
      styles['DeleteModal'],
      {
        [styles['DeleteModal--active']]: this.props.lineItemsBeingRemoved.length
      }
    );
    const id = this.props.lineItemsBeingRemoved[0];

    return (
      <div className={classes}>
        <div
          className={cx(
            styles['DeleteModal-inner'],
            'w100 bg-white drop-shadow-xlarge p3 card'
          )}
        >
          <div className="mb4">
            <span className="big bold">
              Are you sure you want to remove this from your cart?
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              variant="no-style"
              label="Cancel"
              className="mr3 text-peach"
              onClick={() => this.props.actions.cancelRemoveLineItems(id)}
            />
            <Button
              variant="primary"
              color="madison-blue"
              label="Yes"
              onClick={() => this.confirmRemoveLineItems(id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  actions: PropTypes.shape({
    closeMiniCart: PropTypes.func,
    cancelRemoveLineItems: PropTypes.func,
    confirmRemoveLineItems: PropTypes.func
  }),
  checkout: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        quantity: PropTypes.number
      })
    )
  }),
  miniCartIsOpen: PropTypes.bool,
  lineItemsBeingRemoved: PropTypes.arrayOf(PropTypes.string),
  lineItemsBeingUpdated: PropTypes.arrayOf(PropTypes.string)
};

DeleteModal.defaultProps = {
  actions: {
    closeMiniCart: () => {},
    cancelRemoveLineItems: () => {},
    confirmRemoveLineItems: () => {}
  },
  checkout: {
    id: '',
    items: [
      {
        id: '',
        title: '',
        quantity: 1
      }
    ]
  },
  miniCartIsOpen: false,
  lineItemsBeingRemoved: [],
  lineItemsBeingUpdated: []
};

const mapStateToProps = state => {
  return {
    ...state,
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        cancelRemoveLineItems,
        confirmRemoveLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModal);
