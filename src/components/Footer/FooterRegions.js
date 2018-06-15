import React, { Component } from 'react';
import cx from 'classnames';
import { sortHours, abbreviateDay } from 'utils/sortHours';
import styles from './Footer.scss';

class FooterRegions extends Component {
  render() {
    return (
      <div className="mx3">
        <h3 className="my2 text-white Footer__sub-title-text">
          {this.props.region}
        </h3>
        {this.props.stores.map(store => {
          let hours = sortHours(store.fields);
          return (
            <div className="mb3" key={store.sys.id}>
              <h4 className="mb1 text-white Footer__content-title-text">
                {store.fields.title}
              </h4>
              {Object.keys(hours).map((hour, i) => {
                return (
                  <p
                    className="mb1 text-white Footer__content-text"
                    key={i}
                  >{`${hours[hour]}: ${hour}`}</p>
                );
              })}
              {store.fields.delivery ? (
                <div
                  className={cx(
                    'bg-white text-madison-blue inline',
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
