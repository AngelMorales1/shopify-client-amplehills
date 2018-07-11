import React from 'react';
import { sortHours } from 'utils/sortHours';
import styles from './Footer.scss';
import cx from 'classnames';

const FooterRegions = ({ region, stores }) => {
  return (
    <div className={cx('flex flex-column', styles['Footer__Regions-content'])}>
      <h3 className="my2 text-white callout">{region}</h3>
      {stores.map(store => {
        let hours = sortHours(store.fields);
        return (
          <div
            className={cx('mb3', styles['Footer__Regions-store'])}
            key={store.sys.id}
          >
            <h4 className="mb1 text-white bold small nowrap">
              {store.fields.title}
            </h4>
            {Object.keys(hours).map((hour, i) => {
              return (
                <p className="mb1 text-white small nowrap" key={i}>{`${
                  hours[hour]
                }: ${hour}`}</p>
              );
            })}
            {store.fields.delivery ? (
              <div className="bg-white text-madison-blue inline-block mt1 nowrap tag">
                Order Delivery
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default FooterRegions;
