import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Image, Button, Carousel } from 'components/base';
import styles from './ComicStrip.scss';

class ComicStrip extends Component {
  state = {
    activeFlavor: 0,
    activeSlide: 0
  };

  flavorIsActive = index => this.state.activeFlavor === index;

  render() {
    const { block, z, setRef } = this.props;
    const fields = get(block, 'fields', {});
    const products = get(fields, 'products', []);
    const colorClass = `ComicStrip--${get(fields, 'backgroundColor', 'white')}`;
    const dripIsOn = get(fields, 'drip', false);
    const upperDripIsOn = get(fields, 'upperDrip', false);

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx(
          styles[colorClass],
          styles['ComicStrips__container'],
          'flex flex-column justify-center items-center py3',
          {
            drip: dripIsOn,
            'upper-drip': upperDripIsOn
          }
        )}
      >
        <h2
          className={cx(
            styles['ComicStrip__headline'],
            'block-headline center'
          )}
        >
          The Artwork
        </h2>
        <div className="w100 flex justify-center">
          {products.map((product, i) => {
            const color = this.flavorIsActive(i)
              ? 'madison-blue'
              : 'clear-madison-blue-border';

            return (
              <Button
                className="m1 xs-hide sm-hide "
                color={color}
                variant="primary-small"
                shadow={true}
                key={get(product, 'sys.id', '')}
                label={get(product, 'fields.title', '')}
                onClick={() =>
                  this.setState({
                    activeFlavor: i
                  })
                }
              />
            );
          })}
          <Carousel
            className="w100 mx-auto md-hide lg-hide"
            showDots={false}
            onChange={activeFlavor => {
              this.setState({ activeFlavor, activeSlide: 0 }, () =>
                window.dispatchEvent(new Event('resize'))
              );
            }}
          >
            {products.map((product, i) => (
              <div
                key={get(product, 'sys.id', i)}
                className="flex justify-center"
              >
                <Button
                  className="m1"
                  color="madison-blue"
                  variant="primary-small"
                  label={get(product, 'fields.title', '')}
                  onClick={() =>
                    this.setState({
                      activeFlavor: i
                    })
                  }
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div
          className={cx(
            styles['ComicStrips__container'],
            'flex justify-center w100'
          )}
        >
          {products.map((product, i) => {
            const comics = get(product, 'fields.comics', []);
            const classes = cx(
              styles['ComicStrip'],
              'py3 flex flex-column justify-center w100 container-width mx-auto',
              {
                [styles['ComicStrip--active']]: this.flavorIsActive(i)
              }
            );

            return (
              <div className={classes} key={get(product, 'sys.id', i)}>
                <span className="mt3 mb4 mx-auto px3 block-subheadline center text-container-width">
                  {get(product, 'fields.text', '')}
                </span>
                <div className="flex flex-row">
                  {comics.map((comic, i) => {
                    const comicUrl = get(comic, 'fields.file.url', '');
                    return (
                      <div
                        key={get(comic, 'sys.id', i)}
                        className={cx(
                          styles['ComicStrips__container__image'],
                          'transition-slide-up-large m2 xs-hide sm-hide'
                        )}
                      >
                        <Image
                          alt={`${get(comic, 'fields.title', '')}`}
                          src={contentfulImgUtil(comicUrl, '1200')}
                        />
                      </div>
                    );
                  })}
                  <Carousel
                    className="w100 mx-auto md-hide lg-hide"
                    showArrows={false}
                    index={this.state.activeSlide}
                    onChange={activeSlide => this.setState({ activeSlide })}
                  >
                    {comics.map((comic, i) => {
                      const comicUrl = get(comic, 'fields.file.url', '');

                      return (
                        <div
                          key={get(comic, 'sys.id', i)}
                          className={cx(
                            styles['ComicStrips__container__image'],
                            'w-auto mx-auto'
                          )}
                        >
                          <Image
                            alt={`${get(comic, 'fields.title', '')}`}
                            src={contentfulImgUtil(comicUrl, '1200')}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ComicStrip.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            title: PropTypes.string,
            comics: PropTypes.arrayOf(
              PropTypes.shape({
                fields: PropTypes.shape({
                  file: PropTypes.shape({
                    url: PropTypes.string
                  })
                })
              })
            )
          })
        })
      )
    })
  }),
  setRef: PropTypes.func
};

ComicStrip.defaultProps = {
  z: 1,
  block: {
    fields: {
      backgroundColor: '',
      title: '',
      products: [
        {
          fields: {
            title: '',
            comics: [
              {
                fields: {
                  file: {
                    url: ''
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  setRef: () => {}
};

export default ComicStrip;
