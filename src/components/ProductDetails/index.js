import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button } from 'components/base';
import styles from './ProductDetails.scss';

class ProductDetails extends Component {
  constructor() {
    super(...arguments);

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
    const { data, block, z } = this.props;
    const fields = get(block, 'fields', {});
    const details = get(data, 'productDetails', []);
    const colorClass = `ProductDetails--${get(fields, 'color', 'Blue')}`;
    return (
      <div
        className={cx(styles['ProductDetails'], styles[colorClass], 'p2 drip')}
        style={{ zIndex: z }}
      >
        <div className="flex justify-center flex-wrap center mb3">
          <h2 className="block-headline w100 my3">The Details</h2>
          {details.map((detail, i) => {
            const color = this.isActiveFlavor(get(detail, 'sys.id', ''), i)
              ? 'clear-madison-blue-outline'
              : 'madison-blue';

            return (
              <Button
                className="m1"
                color={color}
                variant="primary-small"
                key={get(detail, 'sys.id', '')}
                label={get(detail, 'fields.title', '')}
                onClick={() =>
                  this.setState({
                    activeFlavor: get(detail, 'sys.id', '')
                  })
                }
              />
            );
          })}
        </div>
        <div className={`${styles['ProductDetails--container']}`}>
          {details.map((detail, i) => {
            const fields = get(detail, 'fields', {});

            const classes = cx(
              styles['ProductDetail'],
              'container-width mx-auto flex flex-wrap py3',
              {
                [styles['ProductDetail--active']]: this.isActiveFlavor(
                  get(detail, 'sys.id', ''),
                  i
                )
              }
            );

            return (
              <div className={classes} key={get(detail, 'sys.id', '')}>
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
                    <div
                      className={`${
                        styles['FlavorHighlight--label']
                      } w100 p3 flex justify-center items-center circle bg-goldenrod callout`}
                    >
                      <p>{get(fields, 'flavorHighlight', '')}</p>
                    </div>
                  </div>
                  <div
                    className={`${
                      styles['FlavorHighlight--image']
                    } circle absolute`}
                  >
                    <Image
                      alt={`${get(fields, 'title', '')} flavor highlight`}
                      src={get(
                        fields,
                        'flavorHighlightImage.fields.file.url',
                        ''
                      )}
                    />
                  </div>
                </div>

                <div className="col-12 md-col-6">
                  <div
                    className={cx(
                      styles['ProductDetail--description'],
                      'flex items-center mb4'
                    )}
                  >
                    <div
                      className={cx(
                        styles['ProductDetail--description-image'],
                        'col-3 md-col-2'
                      )}
                    >
                      <Image
                        alt={`${get(fields, 'title', '')} description1 image`}
                        src={get(fields, 'text1Image.fields.file.url', '')}
                      />
                    </div>
                    <div className="md-col-10">
                      <p
                        className={cx(
                          styles['ProductDetail--description-text'],
                          'block-subheadline'
                        )}
                      >
                        {get(fields, 'text1', '')}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cx(
                      styles['ProductDetail--description'],
                      'flex items-center mb4'
                    )}
                  >
                    <div
                      className={cx(
                        styles['ProductDetail--description-image'],
                        'col-3 md-col-2'
                      )}
                    >
                      <Image
                        alt={`${get(fields, 'title', '')} description1 image`}
                        src={get(fields, 'text2Image.fields.file.url', '')}
                      />
                    </div>
                    <div className="md-col-10">
                      <p
                        className={cx(
                          styles['ProductDetail--description-text'],
                          'block-subheadline'
                        )}
                      >
                        {get(fields, 'text2', '')}
                      </p>
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

ProductDetails.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      color: PropTypes.string,
      productDetails: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            details: PropTypes.string,
            flavorHighlight: PropTypes.string,
            pintImage: PropTypes.shape({
              fields: PropTypes.shape({
                description: PropTypes.string,
                file: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            }),
            detailsImage: PropTypes.shape({
              fields: PropTypes.shape({
                description: PropTypes.string,
                file: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            }),
            flavorHighlightImage: PropTypes.shape({
              fields: PropTypes.shape({
                description: PropTypes.string,
                file: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            })
          }),
          sys: PropTypes.shape({
            id: PropTypes.string
          })
        })
      )
    })
  })
};

ProductDetails.defaultProps = {
  z: 1,
  block: {}
};

export default ProductDetails;
