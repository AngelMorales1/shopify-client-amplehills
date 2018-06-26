import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image } from 'components/base';

class ProductWhatIsIncluded extends Component {
  render() {
    const { data } = this.props;
    const whatsIncluded = get(data, 'whatsIncluded', []);
    return (
      <div>
        <h2>{get(data, 'title', '')}</h2>
        {whatsIncluded.map(flavor => {
          const flavorTitle = get(flavor, 'fields.title', '');
          return (
            <div key={flavorTitle}>
              <Image
                alt={`${flavorTitle} image`}
                src={get(flavor, 'fields.image.fields.file.url', '')}
                style={{ width: '50px' }}
              />
              <div>
                <h3>{`${get(
                  flavor,
                  'fields.quantity',
                  '1'
                )}x ${flavorTitle}`}</h3>
                <p>{get(flavor, 'fields.description', '')}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductWhatIsIncluded;
