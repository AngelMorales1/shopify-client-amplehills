import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import orderModel from 'models/orderModel';

import { Button } from 'components/base';

const ProfileOrders = ({ actions, checkout, orders, products }) => {
  const handleReorder = order => {
    const items = order.items.map(item => {
      return {
        variantId: item.productId,
        quantity: item.quantity,
        customAttributes: item.attributes.map(attribute => {
          const { key, value } = attribute;
          return { key, value };
        })
      };
    });

    actions.addLineItems(checkout.id, items);
  };

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
              {order.items.map((item, i) => (
                <div
                  key={`${item.title} ${i}`}
                  className="mb2 flex flex-wrap justify-between"
                >
                  <span className="line-item-title mr2">{item.title}</span>
                  <span className="line-item-title">${item.price}</span>
                  {item.subItems.length ? (
                    <div className="w100">
                      <ul className="mt2 mb1">
                        {item.subItems.map((subItem, i) => (
                          <li
                            className="sub-line-item small"
                            key={`${subItem.handle} ${i}`}
                          >{`${subItem.quantity}x ${
                            products[subItem.handle].title
                          }`}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
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
                  onClick={() => handleReorder(order)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="card card--light-gray-border px3 pt3 pb2 my2 flex flex-column items-center">
            <strong className="bold block mb2">
              Your order history will live here.
            </strong>
            <p className="small">What will your first purchase be?</p>
            <Button
              className="small mt4"
              variant="primary-small"
              color="peach"
              label="Let&apos;s explore!"
              to={'/products'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

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
