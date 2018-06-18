import React, { Component } from 'react';
import cx from 'classnames';
import { sortHours } from 'utils/sortHours';
import styles from './Footer.scss';

class FooterRegions extends Component {
  render() {
    return (
      <div className="mr4">
        <h3 className="my2 text-white bold Footer--bigger-text">
          {this.props.region}
        </h3>
        {this.props.stores.map(store => {
          let hours = sortHours(store.fields);
          return (
            <div className="mb3" key={store.sys.id}>
              <h4 className="mb1 text-white bold Footer--smaller-text">
                {store.fields.title}
              </h4>
              {Object.keys(hours).map((hour, i) => {
                return (
                  <p
                    className="mb1 text-white Footer--smaller-text"
                    key={i}
                  >{`${hours[hour]}: ${hour}`}</p>
                );
              })}
              {store.fields.delivery ? (
                <div
                  className={cx(
                    'bg-white text-madison-blue inline bold Footer__order-delivery-text',
                    styles['order-delivery']
                  )}
                >
                  ORDER DELIVERY
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default FooterRegions;
