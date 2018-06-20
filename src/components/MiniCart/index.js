import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeMiniCart } from 'state/actions/ui/miniCartUIActions';
import {
  removeLineItems,
  updateLineItems
} from 'state/actions/checkoutActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

import { Button, Image, QuantitySelector } from 'components/base';
import styles from './MiniCart.scss';

class MiniCart extends Component {
  removeLineItem = item => {
    const items = [item];

    this.props.actions.removeLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    this.props.actions.updateLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  render() {
    const {
      checkout,
      actions: { closeMiniCart }
    } = this.props;

    const classes = cx(
      styles['MiniCart'],
      'col-11 fixed z-nav p3 bg-white card drop-shadow-xlarge',
      {
        [styles['MiniCart--open']]: this.props.miniCartIsOpen
      }
    );

    const items = get(checkout, 'lineItems', []);

    return (
      <div className={classes}>
        <div className="mb3 center relative">
          <strong className="callout">Cart</strong>
          <Button
            variant="icon-small"
            className="absolute t0 r0 mt1"
            onClick={() => closeMiniCart()}
          >
            <Image src="/assets/images/icon-close.svg" />
          </Button>
        </div>

        <div className="mb4">
          {items.map(item => {
            const classes = cx(styles['MiniCart__line-item'], 'mb2', {
              [styles[
                'MiniCart__line-item--updating'
              ]]: this.props.lineItemsBeingUpdated.includes(get(item, 'id', ''))
            });

            return (
              <div className={classes} key={item.id}>
                <div className="mb2 line-item-title flex justify-between">
                  <span className="mr2">{item.title}</span>
                  <span>
                    ${getLineItemPrice(
                      get(item, 'variant.price', '0.00'),
                      item.quantity
                    )}
                  </span>
                </div>
                <div className="w100 flex justify-between">
                  <QuantitySelector
                    quantity={item.quantity}
                    variant="small"
                    onChange={quantity =>
                      this.updateLineItem(item.id, quantity)
                    }
                  />
                  <Button
                    variant="icon"
                    onClick={() => this.removeLineItem(item.id)}
                  >
                    <Image src="/assets/images/icon-trash.svg" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt3 flex justify-between items-center">
          <span className="bold">Subtotal: ${checkout.subtotalPrice}</span>
          <Button
            disabled={!items.length}
            // TODO: redirect to amplehills.com/checkout
            to={checkout.webUrl}
            color="madison-blue"
            onClick={() => closeMiniCart()}
            label="Checkout"
          />
        </div>
      </div>
    );
  }
}

MiniCart.propTypes = {
  actions: PropTypes.shape({
    closeMiniCart: PropTypes.func,
    removeLineItems: PropTypes.func,
    updateLineItems: PropTypes.func
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
  lineItemsBeingUpdated: PropTypes.arrayOf(PropTypes.string)
};

MiniCart.defaultProps = {
  actions: {
    closeMiniCart: () => {},
    removeLineItems: () => {},
    updateLineItems: () => {}
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
  miniCartIsOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen', false),
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeMiniCart,
        removeLineItems,
        updateLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniCart);
