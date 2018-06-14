import React, { Component } from 'react';
import { sortHours, abbreviateDay } from 'utils/sortHours';
import styles from './Footer.scss';

class FooterRegions extends Component {
  render() {
    return (
      <div className="mx3">
        <h3 className={`footer-text my2 ${styles['sub-title-text']}`}>
          {this.props.region}
        </h3>
        {this.props.stores.map(store => {
          let hours = sortHours(store.fields);
          return (
            <div className="mb3" key={store.sys.id}>
              <h4 className={`footer-text mb1 ${styles['content-title-text']}`}>
                {store.fields.title}
              </h4>
              {Object.keys(hours).map((hour, idx) => {
                return (
                  <p
                    className={`footer-text ${styles['content-text']} mb1`}
                    key={idx}
                  >{`${hours[hour]}: ${hour}`}</p>
                );
              })}
              {store.fields.delivery ? (
                <button className={`${styles['delivery-button']}`}>
                  ORDER DELIVERY
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default FooterRegions;
