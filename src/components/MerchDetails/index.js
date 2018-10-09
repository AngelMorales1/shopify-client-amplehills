import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Image, Button } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './MerchDetails.scss';

class MerchDetails extends Component {
  constructor() {
    super(...arguments);

    this.state = {};
  }

  render() {
    const merch = get(this, 'props.merch', {});
    const breadcrumbs = [{ to: '/order-online', label: 'Order Online' }];

    return (
      <div className={cx(styles['MerchDetails'])}>
        <Breadcrumbs
          className={cx(styles['MerchDetails__breadcrumbs'])}
          breadcrumbs={breadcrumbs}
        />
        <div className={cx(styles['MerchDetails__container'], 'flex')}>
          <div
            className={cx(
              styles['MerchDetails__image'],
              'aspect-4-3 my2 col-12 md-hide lg-hide'
            )}
            style={{
              background: `url(${contentfulImgUtil(
                get(merch, 'images[0].fields.file.url', ''),
                '900'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <div>details</div>
          <div className="col-12 md-col-6">
            <div
              className={cx(
                styles['MerchDetails__image'],
                'aspect-4-3 my2 xs-hide sm-hide'
              )}
              style={{
                background: `url(${contentfulImgUtil(
                  get(merch, 'images[0].fields.file.url', ''),
                  '900'
                )}) no-repeat center`,
                backgroundSize: 'cover'
              }}
            />
            {merch.images.length > 4 ? (
              <Fragment>
                <div
                  className={cx(
                    styles['MerchDetails__image-container--divide'],
                    'w100 flex'
                  )}
                >
                  <div
                    className={cx(
                      styles['MerchDetails__image--divide'],
                      'aspect-4-3'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(merch, 'images[1].fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                  <div
                    className={cx(
                      styles['MerchDetails__image--divide'],
                      'aspect-4-3'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(merch, 'images[2].fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                </div>
                {get(merch, 'images', [])
                  .slice(3)
                  .map(image => (
                    <div
                      className={cx(
                        styles['MerchDetails__image'],
                        'aspect-4-3 my2'
                      )}
                      style={{
                        background: `url(${contentfulImgUtil(
                          get(image, 'fields.file.url', ''),
                          '900'
                        )}) no-repeat center`,
                        backgroundSize: 'cover'
                      }}
                    />
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                {get(merch, 'images', [])
                  .slice(1)
                  .map(image => (
                    <div
                      className={cx(
                        styles['MerchDetails__image'],
                        'aspect-4-3 my2'
                      )}
                      style={{
                        background: `url(${contentfulImgUtil(
                          get(image, 'fields.file.url', ''),
                          '900'
                        )}) no-repeat center`,
                        backgroundSize: 'cover'
                      }}
                    />
                  ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MerchDetails.propTypes = {};

MerchDetails.defaultProps = {};

export default MerchDetails;
