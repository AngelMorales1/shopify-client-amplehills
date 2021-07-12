import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image } from 'components/base';
import PressCard from 'components/PressCard';

class PressBlock extends Component {
  render() {
    const { block, z, setRef, drip } = this.props;
    const pressItems = get(block, 'pressItems', []);

    if (!pressItems.length) return;

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx({ drip: drip })}
      >
        <div className="mx-auto my4 px2 col-12 md-col-6 flex flex-column items-center">
          <span className="block-headline text-peach center">
            {pressItems[0].quote}
          </span>
          <Image
            className="col-3 mt4 mb2"
            src={`${pressItems[0].logo.src}?w=600`}
          />
        </div>
        <div className="p3 flex flex-row justify-center flex-wrap">
          {pressItems.map(pressItem => (
            <PressCard key={pressItem._key} pressCard={pressItem} />
          ))}
        </div>
      </div>
    );
  }
}

PressBlock.propTypes = {
  pressItems: PropTypes.object,
  z: PropTypes.number,
  setRef: PropTypes.func,
  drip: PropTypes.bool
};

PressBlock.defaultProps = {
  pressItems: null,
  z: 1,
  setRef: () => {},
  drip: false
};

export default PressBlock;
