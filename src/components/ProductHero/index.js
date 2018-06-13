import React, { Component } from 'react';
import PropTypes from 'prop-types';

import get from 'utils/get';
import { Image, Radio, Button } from 'components/base';

import styles from './ProductHero.scss';

class ProductHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };
  }

  render() {
    const { data, product, z } = this.props;
    const heroImage = get(product, 'images[0].src', '');
    const availability = get(product, 'variants[0].availability', []);

    console.log(this.props);
    return (
      <div
        className={`${styles['ProductHero']} flex py4`}
        style={{ zIndex: z }}
      >
        <div className="col col-12 md-col-6 right-align">
          <Image className="col-7" src={heroImage} />
        </div>

        <div className="col col-12 md-col-6">
          <div className="col-8 mx-auto">
            <div className="relative inline-block">
              <h1 className="block-headline mb4 relative z-1">
                {get(data, 'title')}
              </h1>
              <Image
                className={`${
                  styles['ProductHero__title-illustration']
                } absolute`}
                src={get(data, 'titleIllustration.fields.file.url', '')}
              />
            </div>
            <div>
              <p className="copy pr2">{get(product, 'description', '')}</p>
            </div>
            <form>
              <QuantitySelector onChange={value => this.setState({ value })} />
              <Button />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductHero.propTypes = {
  data: PropTypes.shape({})
};

ProductHero.defaultProps = {
  data: {},
  z: 1,
  product: {}
};

export default ProductHero;
