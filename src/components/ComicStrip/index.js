import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button, Carousel } from 'components/base';
import styles from './ComicStrip.scss';

class ComicStrip extends Component {
  componentDidMount() {
    window.dispatchEvent(new Event('resize'));
  }

  state = {
    activeFlavor: 0,
    activeSlide: 0
  };

  flavorIsActive = index => this.state.activeFlavor === index;

  render() {
    const { block, z } = this.props;
    const fields = get(block, 'fields', {});
    const products = get(fields, 'products', []);
    const colorClass = `ComicStrip--${get(
      fields,
      'backgroundColor',
      'yellow'
    )}`;

    return (
      <div
        style={{ zIndex: z }}
        className={cx(
          styles[colorClass],
          styles['ComicStrips__container'],
          'flex flex-column justify-center items-center py3'
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
                key={i}
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
            showDots={false}
            onChange={activeFlavor => {
              this.setState({ activeFlavor, activeSlide: 0 }, () =>
                window.dispatchEvent(new Event('resize'))
              );
            }}
            className={cx(
              styles['ComicStrip--button-container'],
              'md-hide lg-hide'
            )}
          >
            {products.map((product, i) => (
              <div key={i} className="flex justify-center">
                <Button
                  className="m1"
                  color="madison-blue"
                  variant="primary-small"
                  shadow={true}
                  key={i}
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
              'py3 flex justify-center w100 container-width mx-auto',
              {
                [styles['ComicStrip--active']]: this.flavorIsActive(i)
              }
            );

            return (
              <div className={classes} key={i}>
                {comics.map((comic, i) => {
                  const comicUrl = get(comic, 'fields.file.url', '');
                  return (
                    <div
                      key={i}
                      className={cx(
                        styles['ComicStrips__container__image'],
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
                  className="w-auto md-hide lg-hide"
                  showArrows={false}
                  index={this.state.activeSlide}
                  onChange={activeSlide => this.setState({ activeSlide })}
                >
                  {comics.map((comic, i) => {
                    const comicUrl = get(comic, 'fields.file.url', '');

                    return (
                      <div
                        key={`${i}-${get(comic, 'sys.id', '')}`}
                        className={cx(
                          styles['ComicStrips__container__image'],
                          'w-auto mx-auto'
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
