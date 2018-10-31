import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image } from 'components/base';
import PressCard from 'components/PressCard';

class PressBlock extends Component {
  render() {
    const { model, pressItems, z, setRef, drip } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const pressItemsId = get(pressItems, 'fragments', []).map(fragment =>
      get(fragment[0], 'value', '')
    );
    const firstPressItem = get(
      pressItems,
      `simpleFragments.${pressItemsId[0]}`,
      {}
    );

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx({ drip: drip })}
      >
        <div className="mx-auto my4 px2 col-12 md-col-6 flex flex-column items-center">
          <span className="block-headline text-peach center">{`"${get(
            firstPressItem,
            'quote',
            ''
          )}"`}</span>
          <Image
            className="col-3 mt4 mb2"
            src={get(firstPressItem, 'logoImage.data', '')}
          />
        </div>
        <div className="p3 flex flex-row justify-center flex-wrap">
          {pressItemsId.map((pressItemId, i) => (
            <PressCard
              key={pressItemId}
              pressCard={get(pressItems, `simpleFragments.${pressItemId}`, {})}
            />
          ))}
        </div>
      </div>
    );
  }
}

PressBlock.PropTypes = {
  pressItems: PropTypes.objet,
  z: PropTypes.number,
  setRef: PropTypes.func,
  drip: PropTypes.bool
};

PressBlock.defaultProps = {
  pressItems: {},
  z: 1,
  setRef: () => {},
  drip: false
};

export default PressBlock;
