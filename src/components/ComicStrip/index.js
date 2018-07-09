import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button, Carousel } from 'components/base';
import styles from './ComicStrip.scss';

class ComicStrip extends Component {
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
    const { block, z } = this.props;
    const fields = get(block, 'fields', {});
    const products = get(fields, 'products', []);
    console.log(products);
    const colorClass = `ComicStrip--${get(fields, 'color', 'yellow')}`;
    return (
      <div
        style={{ zIndex: z }}
        className={cx(
          styles[colorClass],
          styles['ComicStrips--container'],
          'flex flex-column justify-center items-center py3'
        )}
      >
        <h2 className="block-headline m4 center">The Artwork</h2>
        <div className="w100 flex justify-center">
          {products.map((product, i) => {
            const color = this.isActiveFlavor(get(product, 'sys.id', ''), i)
              ? 'madison-blue'
              : 'clear-madison-blue-outline';

            return (
              <Button
                className="m1 xs-hide sm-hide "
                color={color}
                variant="primary-small"
                key={get(product, 'sys.id', '')}
                label={get(product, 'fields.title', '')}
                onClick={() =>
                  this.setState({
                    activeFlavor: get(product, 'sys.id', '')
                  })
                }
              />
            );
          })}
          <Carousel
            className={cx(
              styles['ComicStrip--button-container'],
              'md-hide lg-hide'
            )}
            ShowArrow={true}
          >
            {products.map((product, i) => {
              const color = this.isActiveFlavor(get(product, 'sys.id', ''), i)
                ? 'clear-madison-blue-outline'
                : 'madison-blue';

              return (
                <Button
                  className="m1"
                  color={color}
                  variant="primary-small"
                  key={get(product, 'sys.id', '')}
                  label={get(product, 'fields.title', '')}
                  onClick={() =>
                    this.setState({
                      activeFlavor: get(product, 'sys.id', '')
                    })
                  }
                />
              );
            })}
          </Carousel>
        </div>
        <div
          className={cx(
            styles['ComicStrips--container'],
            'flex justify-center w100'
          )}
        >
          {products.map((product, i) => {
            const comics = get(product, 'fields.comics', []);
            const classes = cx(
              styles['ComicStrip'],
              'py3 flex justify-center',
              {
                [styles['ComicStrip--active']]: this.isActiveFlavor(
                  get(product, 'sys.id', ''),
                  i
                )
              }
            );
            return (
              <div className={cx(classes)} key={get(product, 'sys.id', '')}>
                {comics.map((comic, i) => {
                  const comicUrl = get(comic, 'fields.file.url', '');
                  return (
                    <div
                      key={`${i}-${get(comic, 'sys.id', '')}`}
                      className={cx(
                        styles['ComicStrips--container--image'],
                        'm2 xs-hide sm-hide'
                      )}
                    >
                      <Image
                        alt={`${get(comic, 'fields.title', '')}`}
                        src={comicUrl}
                      />
                    </div>
                  );
                })}
                <Carousel
                  className="md-hide lg-hide"
                  showNextItemShadow={true}
                  showIndicators={true}
                >
                  {comics.map((comic, i) => {
                    const comicUrl = get(comic, 'fields.file.url', '');
                    return (
                      <div
                        key={`${i}-${get(comic, 'sys.id', '')}`}
                        className={cx(
                          styles['ComicStrips--container--image'],
                          'mx-auto'
                        )}
                      >
                        <Image
                          alt={`${get(comic, 'fields.title', '')}`}
                          src={comicUrl}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComicStrip;
