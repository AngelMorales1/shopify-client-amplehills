import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import get from 'utils/get';
import { Image, Button, QuantitySelector } from 'components/base';

import styles from './ProductHero.scss';

class ProductHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };
  }

  addToCart = () => {
    const variant = get(this.props, 'product.variants[0].id', {});
    const items = [
      {
        variantId: variant,
        quantity: this.state.quantity
      }
    ];

    this.props.addLineItems(this.props.checkout, items).then(() => {
      this.setState({ quantity: 1 });
    });
  };

  render() {
    const { data, product, z } = this.props;
    const heroImage = get(product, 'images[0].src', '');
    const availability = get(product, 'variants[0].available', false);
    const price = get(product, 'variants[0].price', []);

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
                className={cx(
                  'absolute',
                  styles['ProductHero__title-illustration']
                )}
                src={get(data, 'titleIllustration.fields.file.url', '')}
              />
            </div>
            <div>
              <p className="copy pr2">{get(product, 'description', '')}</p>
            </div>
            <form>
              <QuantitySelector
                className="my3"
                quantity={this.state.quantity}
                onChange={value => this.setState({ quantity: value })}
              />
              <Button
                color="denim"
                onClick={this.addToCart}
                disabled={!availability}
              >
                <span className="mr2">Add to Cart</span>
                <span className="ml2">
                  ${(price * this.state.quantity).toFixed(2)}
                </span>
              </Button>
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
