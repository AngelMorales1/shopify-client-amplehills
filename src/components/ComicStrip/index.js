import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button } from 'components/base';
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
    const colorClass = `ComicStrip--${get(fields, 'color', 'Yellow')}`;
    return (
      <div
        style={{ zIndex: z }}
        className={cx(styles[colorClass], 'flex flex-column items-center')}
      >
        <h2 className="block-headline">The Artwork</h2>
        <div>
          {products.map((product, i) => {
            const color = this.isActiveFlavor(get(product, 'sys.id', ''), i)
              ? 'denim'
              : 'white-denim';

            return (
              <Button
                className="m1"
                color={color}
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
        </div>
        <div className={`${styles['ComicStrips--container']}`}>
          {products.map((product, i) => {
            const comics = get(product, 'fields.comicStrip', []);
            const classes = cx(
              styles['ComicStrip'],
              'container-width mx-auto flex flex-wrap py3',
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
                        'm3'
                      )}
                    >
                      <Image
                        alt={`${get(comic, 'fields.title', '')}`}
                        src={comicUrl}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComicStrip;
