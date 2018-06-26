import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ProductWhatsIncluded.scss';
import { Image } from 'components/base';

class ProductWhatsIncluded extends Component {
  render() {
    const { data } = this.props;
    const whatsIncluded = get(data, 'whatsIncluded', []);
    const colorClass = `ProductWhatsIncluded--${get(
      data,
      'backgroundColor',
      'Light-Pink'
    )}`;
    return (
      <div className={cx(styles['ProductWhatsIncluded'], styles[colorClass])}>
        <h2 className="block-headline m3 nowrap">{get(data, 'title', '')}</h2>
        <div className="flex flex-column">
          {whatsIncluded.map(flavor => {
            const flavorTitle = get(flavor, 'fields.title', '');
            return (
              <div
                key={flavorTitle}
                className={cx(
                  styles['ProductWhatsIncluded__flavor-container'],
                  'flex items-center my2'
                )}
              >
                <Image
                  alt={`${flavorTitle} image`}
                  src={get(flavor, 'fields.image.fields.file.url', '')}
                  className={cx(
                    styles['ProductWhatsIncluded__image'],
                    'mr3 col-2'
                  )}
                />
                <div>
                  <h3 className="block-subheadline bold nowrap">{`${get(
                    flavor,
                    'fields.quantity',
                    '1'
                  )}x ${flavorTitle}`}</h3>
                  <p className="description nowrap">
                    {get(flavor, 'fields.description', '')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductWhatsIncluded;
