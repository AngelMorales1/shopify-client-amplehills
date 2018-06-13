import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button } from 'components/base';
import styles from './ProductDetails.scss';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFlavor: false
    };
  }

  isActiveFlavor(id, index) {
    return (
      this.state.activeFlavor === id || (!index && !this.state.activeFlavor)
    );
  }

  render() {
    const { data } = this.props;
    const details = get(data, 'productDetails', []);

    const colorClass = `ProductDetails--${get(data, 'color', 'Blue')}`;

    return (
      <div
        className={`${styles['ProductDetails']} ${
          styles[colorClass]
        } p2 overflow-visible drip`}
        style={{ zIndex: this.props.z }}
      >
        <div className="flex justify-center flex-wrap center mb3">
          <h2 className="block-headline w100 my3">The Details</h2>
          {details.map((detail, i) => {
            const color = this.isActiveFlavor(detail.sys.id, i)
              ? 'denim'
              : 'white-denim';

            return (
              <Button
                className="m1"
                color={color}
                key={detail.sys.id}
                label={detail.fields.title}
                onClick={() =>
                  this.setState({
                    activeFlavor: detail.sys.id
                  })
                }
              />
            );
          })}
        </div>
        <div className={`${styles['ProductDetails--container']}`}>
          {details.map((detail, i) => {
            const { fields } = detail;

            const classes = cx(
              styles['ProductDetail'],
              'container-width mx-auto flex flex-wrap flex-column py3',
              {
                [styles['ProductDetail--active']]: this.isActiveFlavor(
                  detail.sys.id,
                  i
                )
              }
            );

            return (
              <div className={classes} key={detail.sys.id}>
                <div
                  className={`${
                    styles['FlavorHighlight']
                  } relative col-12 md-col-6 z-1`}
                >
                  <div
                    className={`${
                      styles['FlavorHighlight--wrapper']
                    } flex items-center flex-wrap z-1 relative`}
                  >
                    <div className="w100 center">
                      <Image
                        className="arrow mb1"
                        src="/assets/images/arrow-right.svg"
                      />
                    </div>
                    <div
                      className={`${
                        styles['FlavorHighlight--label']
                      } w100 p3 flex justify-center items-center circle bg-goldenrod callout`}
                    >
                      <p>{fields.flavorHighlight}</p>
                    </div>
                  </div>
                  <div
                    className={`${
                      styles['FlavorHighlight--image']
                    } circle absolute`}
                  >
                    <Image
                      alt={`${fields.title} flavor highlight`}
                      src={fields.flavorHighlightImage.fields.file.url}
                    />
                  </div>
                </div>
                <div
                  className={`${
                    styles['ProductDetail--description']
                  } col-12 md-col-6 mb2`}
                >
                  <div className="col col-12 md-col-3">
                    <Image
                      alt={`pint of ${fields.title}`}
                      className="col-3 md-col-9"
                      src={fields.pintImage.fields.file.url}
                    />
                  </div>
                  <div className="col col-12 md-col-9">
                    <p className="description">{fields.description}</p>
                  </div>
                </div>
                <div
                  className={`${
                    styles['ProductDetail--detail']
                  } col-12 md-col-6 mb2`}
                >
                  <div className="flex">
                    <div className="col-4 md-col-3">
                      <Image
                        alt={`${fields.title} ice cream details`}
                        className="circle square col-12 md-col-9"
                        src={fields.detailsImage.fields.file.url}
                      />
                    </div>
                    <div className="col-8 md-col-9 flex flex-wrap content-center items-center">
                      <div className="w100">
                        <Image
                          className="arrow mb1"
                          src="/assets/images/arrow-left.svg"
                        />
                      </div>
                      <p className="callout-small">{fields.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductDetails;
