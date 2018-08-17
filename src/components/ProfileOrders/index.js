import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'utils/get';

import orderModel from 'models/orderModel';

import { Button, Modal } from 'components/base';

class ProfileOrders extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      itemNotAvailable: null
    };
  }

  handleReorder = order => {
    const items = order.items.map(item => {
      if (item.productId.length < 1) {
        this.setState({ itemNotAvailable: item });
      }
      return {
        variantId: item.productId,
        quantity: item.quantity,
        customAttributes: item.attributes.map(attribute => {
          const { key, value } = attribute;
          return { key, value };
        })
      };
    });

    this.props.actions.addLineItems(this.props.checkout.id, items);
  };
  render() {
    const { actions, checkout, orders, products } = this.props;

    return (
      <div className="my3">
        <h2 className="carter sub-title mb3">Order History</h2>
        <div>
          {orders.length ? (
            orders.map(order => (
              <div
                key={order.id}
                className="card card--light-gray-border px3 pt3 pb2 my2"
              >
                <p className="bold text-peach mb3">
                  {moment(order.date).format('MMMM D, YYYY')}
                </p>
                {order.items.map((item, i) => {
                  const subItems = get(item, 'subItems', []);
                  return (
                    <div
                      key={`${item.title} ${i}`}
                      className="mb2 flex flex-wrap justify-between"
                    >
                      <span className="line-item-title mr2">{item.title}</span>
                      <span className="line-item-title">${item.price}</span>
                      {subItems.length ? (
                        <div className="w100">
                          <ul className="mt2 mb1">
                            {subItems.map((subItem, i) => (
                              <li
                                className="sub-line-item small"
                                key={`${subItem.handle} ${i}`}
                              >{`${subItem.quantity}x ${get(
                                products,
                                `[${subItem.handle}].title`,
                                subItem.handle
                              )}`}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div className="mt4 flex flex-wrap">
                  <Button
                    className="tag mb2 mr2 bg-peach text-white w-auto"
                    variant="secondary"
                    label="View Receipt"
                    to={order.receipt}
                  />
                  <Button
                    className="tag mb2 bg-peach text-white"
                    variant="secondary"
                    label="Re-order"
                    onClick={() => this.handleReorder(order)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="card card--light-gray-border py4 px3 pb2 my2 flex flex-column items-center">
              <strong className="bold block mb2 center">
                Your order history will live here.
              </strong>
              <p className="small center">
                You don&apos;t have any past orders. Let&apos;s fix that!
              </p>
              <Button
                className="small mt3 pt0 pb1 h100 align-middle"
                variant="primary-small"
                color="peach"
                label="Find your pint →"
                to={'/products'}
              />
            </div>
          )}
        </div>
        {this.state.itemNotAvailable ? (
          <Modal>
            <div className="mb3 flex flex-row justify-center">
              <span className="sub-title">Below item is not available</span>
            </div>
            <div className="mb2 flex flex-wrap justify-between">
              <span className="line-item-title mr2">
                {this.state.itemNotAvailable.title}
              </span>
              <span className="line-item-title">
                ${this.state.itemNotAvailable.price}
              </span>
            </div>
            {this.state.itemNotAvailable.subItems.length ? (
              <div>
                <ul className="mt2 mb1">
                  {this.state.itemNotAvailable.subItems.map((subItem, i) => (
                    <li
                      className="sub-line-item small"
                      key={`${subItem.handle} ${i}`}
                    >{`${subItem.quantity}x ${get(
                      products,
                      `[${subItem.handle}].title`,
                      subItem.handle
                    )}`}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Button
              className="ml-auto"
              color="madison-blue"
              label="Ok"
              onClick={() => this.setState({ itemNotAvailable: null })}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

ProfileOrders.propTypes = {
  actions: PropTypes.shape({
    addLineItems: PropTypes.func
  }),
  orders: PropTypes.arrayOf(orderModel.propTypes)
};

ProfileOrders.defaultProps = {
  actions: {
    addLineItems: () => {}
  },
  orders: []
};

export default ProfileOrders;
