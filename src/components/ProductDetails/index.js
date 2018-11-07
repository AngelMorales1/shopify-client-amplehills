import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

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
    const { block, z, setRef } = this.props;
    const fields = get(block, 'fields', {});
    const details = get(fields, 'productDetails', []);
    const colorClass = `ProductDetails--${get(fields, 'color', '')}`;

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        className={cx(styles['ProductDetails'], styles[colorClass], 'p2 drip')}
        style={{ zIndex: z }}
      >
        <div className="flex justify-center flex-wrap center mb3">
          <h2 className="block-headline w100 my3">The Details</h2>
          {details.map((detail, i) => {
            const color = this.isActiveFlavor(get(detail, 'sys.id', ''), i)
              ? 'clear-madison-blue-border'
              : 'madison-blue';

            return (
              <Button
                className="m1"
                color={color}
                variant="primary-small"
                shadow={true}
                key={get(detail, 'sys.id', i)}
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
              'transition-slide-up-large container-width mx-auto flex items-center py3',
              {
                [styles['ProductDetail--active']]: this.isActiveFlavor(
                  get(detail, 'sys.id', ''),
                  i
                )
              }
            );

            return (
              <div className={classes} key={get(detail, 'sys.id', '')}>
                <div className="col-12 md-col-6">
                  <div
                    className={cx(
                      styles['ProductDetail--description'],
                      'flex justify-center items-center mb4'
                    )}
                  >
                    <div
                      className={cx(
                        styles['ProductDetail--description-image'],
                        'col-3 md-col-2'
                      )}
                    >
                      <Image
                        alt={`${get(fields, 'title', '')} description image`}
                        src={contentfulImgUtil(
                          get(fields, 'text1Image.fields.file.url', ''),
                          '500',
                          'png'
                        )}
                      />
                    </div>
                    <div className="md-col-10">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: marked(get(fields, 'text1', ''))
                        }}
                        className={cx(
                          styles['ProductDetail--description-text'],
                          'markdown-block'
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className={cx(
                      styles['ProductDetail--description'],
                      'flex items-center'
                    )}
                  >
                    <div
                      className={cx(
                        styles['ProductDetail--description-image'],
                        'col-3 md-col-2'
                      )}
                    >
                      <Image
                        alt={`${get(fields, 'title', '')} description image`}
                        src={contentfulImgUtil(
                          get(fields, 'text2Image.fields.file.url', ''),
                          '500',
                          'png'
                        )}
                      />
                    </div>
                    <div className="md-col-10">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked(get(fields, 'text2', ''))
                        }}
                        className={cx(
                          styles['ProductDetail--description-text'],
                          'markdown-block'
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    styles['FlavorHighlight']
                  } relative col-10 md-col-5 z-1`}
                >
                  <div
                    className={`${
                      styles['FlavorHighlight--wrapper']
                    } z-1 absolute flex justify-center items-center`}
                  >
                    <p
                      className={cx(
                        styles['FlavorHighlight--label-text'],
                        'absolute center callout-small z-1'
                      )}
                    >
                      {get(fields, 'flavorHighlight', '')}
                    </p>
                    <div
                      className={`${
                        styles['FlavorHighlight--label']
                      } p3 circle square bg-yellow`}
                    />
                  </div>
                  <div>
                    <div
                      className="circle square"
                      style={{
                        background: `url(${contentfulImgUtil(
                          get(
                            fields,
                            'flavorHighlightImage.fields.file.url',
                            ''
                          ),
                          '1400'
                        )}) no-repeat center`,
                        backgroundSize: 'cover'
                      }}
                    />
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
            flavorHighlight: PropTypes.string,
            flavorHighlightImage: PropTypes.shape({
              fields: PropTypes.shape({
                description: PropTypes.string,
                file: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            }),
            text1: PropTypes.string,
            text1Image: PropTypes.shape({
              fields: PropTypes.shape({
                description: PropTypes.string,
                file: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            }),
            text2: PropTypes.string,
            text2Image: PropTypes.shape({
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
  }),
  setRef: PropTypes.func
};

ProductDetails.defaultProps = {
  z: 1,
  block: {
    fields: {
      color: 'Blue',
      productDetails: [
        {
          fields: {
            title: '',
            flavorHighlight: '',
            flavorHighlightImage: {
              fields: {
                description: '',
                file: {
                  url: ''
                }
              }
            }
          },
          sys: {
            id: ''
          }
        }
      ]
    }
  },
  setRef: () => {}
};

export default ProductDetails;
