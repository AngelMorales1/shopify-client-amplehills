import React from 'react';

const ProfileOrders = ({ actions, orders, products }) => {
  return (
    <div className="my3">
      <h2 className="carter sub-title mb3">Order History</h2>
      <div>
        {orders.map(order => (
          <div className="card card--light-gray-border p3 my2">
            <p className="bold text-peach mb3">{order.date}</p>
            {order.items.map(item => (
              <div className="mb2 flex flex-wrap justify-between">
                <span className="line-item-title mr2">{item.title}</span>
                <span className="line-item-title">${item.price}</span>
                {item.subItems.length ? (
                  <div className="w100">
                    <ul className="mt2 mb1">
                      {item.subItems.map(subItem => (
                        <li
                          className="sub-line-item small"
                          key={subItem.handle}
                        >{`${subItem.quantity}x ${
                          products[subItem.handle].title
                        }`}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileOrders.propTypes = {};

ProfileOrders.defaultProps = {
  actions: {},
  orders: []
};

export default ProfileOrders;
