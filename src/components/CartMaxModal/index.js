import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import { closeCartMax } from 'state/actions/ui/cartMaxUIActions';

import { Button } from 'components/base';

import get from 'utils/get';
import styles from './CartMaxModal.scss';

const CartMaxModal = props => {
  const { cartMaxIsActive } = props;

  const classes = cx(
    'fixed-cover bg-white-wash flex justify-center items-center transition',
    styles['CartMaxModal'],
    {
      [styles['CartMaxModal--active']]: cartMaxIsActive
    }
  );

  return (
    <div className={classes} aria-hidden={!cartMaxIsActive}>
      <div
        className={cx(
          styles['CartMaxModal-inner'],
          'w100 bg-white drop-shadow-xlarge p3 m3 card'
        )}
      >
        <div className="mb4">
          <span className="big bold">
            You can only add two bundles in one order. Please checkout first
            before adding any more items.
          </span>
        </div>
        <div className="flex justify-end items-center">
          <Button
            ariaLabel="Cancel"
            variant="style-none"
            label="Cancel"
            hover={'underline-peach'}
            className="mr3 text-peach"
            onClick={() => props.actions.closeCartMax()}
          />
          <Button
            ariaLabel="Checkout"
            variant="primary"
            color="madison-blue"
            label="Checkout"
            shadow={true}
            to={props.checkout.webUrl}
          />
        </div>
      </div>
    </div>
  );
};

CartMaxModal.propTypes = {
  actions: PropTypes.shape({
    closeCartMax: PropTypes.func
  }),
  cartMaxIsActive: PropTypes.bool,
  checkout: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        quantity: PropTypes.number
      })
    ),
    webUrl: PropTypes.string
  })
};

CartMaxModal.defaultProps = {
  actions: {
    closeCartMaxModal: () => {}
  },
  cartMaxIsActive: false,
  checkout: {
    id: '',
    items: [
      {
        id: '',
        title: '',
        quantity: 1
      }
    ],
    webUrl: ''
  }
};

const mapStateToProps = state => {
  return {
    ...state,
    checkout: get(state, 'session.checkout'),
    cartMaxIsActive: get(state, 'cartMaxUI.cartMaxIsActive')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeCartMax
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartMaxModal);
