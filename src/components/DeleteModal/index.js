import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import {
  confirmRemoveLineItems,
  cancelRemoveLineItems
} from 'state/actions/checkoutActions';

import { Button } from 'components/base';

import get from 'utils/get';
import lineItems from 'state/selectors/lineItems';
import styles from './DeleteModal.scss';

const DeleteModal = props => {
  const confirmRemoveLineItems = item => {
    const { lineItems } = props;
    const lineItem = lineItems.find(lineItem => lineItem.id === item);
    const idAttr = get(lineItem, 'attributes', []).find(
      attr => attr.key === '__CYOS_PACK_ID__'
    );
    const pack = idAttr ? idAttr.value : '';
    const items = !!pack
      ? lineItems
          .filter(lineItem => {
            const attrs = get(lineItem, 'attributes', []);
            const idAttr = attrs.find(attr => attr.key === '__CYOS_PACK_ID__');

            return !!idAttr && idAttr.value === pack;
          })
          .map(lineItem => lineItem.id)
      : [item];
    const { actions } = props;

    actions.confirmRemoveLineItems(get(props, 'checkout.id', null), items);
  };

  const deleteModalIsActive = props.lineItemsBeingRemoved.length;

  const classes = cx(
    'fixed-cover bg-white-wash flex justify-center items-center transition',
    styles['DeleteModal'],
    {
      [styles['DeleteModal--active']]: deleteModalIsActive
    }
  );
  const id = props.lineItemsBeingRemoved[0];

  return (
    <div className={classes} aria-hidden={!deleteModalIsActive}>
      <div
        className={cx(
          styles['DeleteModal-inner'],
          'w100 bg-white drop-shadow-xlarge p3 m3 card'
        )}
      >
        <div className="mb4">
          <span className="big bold">
            Removing this item from your cart will remove all items included in
            this pack. Do you want to remove these items?
          </span>
        </div>
        <div className="flex justify-end items-center">
          <Button
            ariaLabel="Do not remove this item"
            variant="style-none"
            label="Cancel"
            hover={'underline-peach'}
            className="mr3 text-peach"
            onClick={() => props.actions.cancelRemoveLineItems(id)}
          />
          <Button
            ariaLabel="Remove this item"
            variant="primary"
            color="madison-blue"
            label="Yes"
            shadow={true}
            onClick={() => confirmRemoveLineItems(id)}
          />
        </div>
      </div>
    </div>
  );
};

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
    checkout: get(state, 'session.checkout'),
    lineItems: lineItems(state),
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
