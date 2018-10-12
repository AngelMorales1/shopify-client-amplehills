import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';
import SubNavScrollOption from 'constants/SubNavScrollOption';

import LocationDetailHero from 'components/LocationDetailHero';
import BlockSwitch from 'components/BlockSwitch';
import { SubNav } from 'components/base';

class LocationDetailView extends Component {
  refBlocks = {};

  render() {
    const { model, blocks, location, locationGeoJSON, events } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const menuList = location.contentBlocks.map(block =>
      get(block, 'fields.title', '')
    );

    const blocksLength = get(location, 'contentBlocks', []).length;

    return (
      <Fragment>
        {blocksLength ? (
          <SubNav
            onClick={menuTitle =>
              scrollTo(this.refBlocks[menuTitle], SubNavScrollOption)
            }
            menuList={menuList}
          />
        ) : null}
        <div className="subnav-padding-on-last-child">
          <LocationDetailHero
            z={blocksLength + 1}
            location={location}
            locationGeoJSON={locationGeoJSON}
            events={events}
            z={blocks.length + 1}
          />
          {blocks &&
            blocks.map((block, i) => {
              const title = get(block, 'fields.title', '');
              const blockZIndex = blocksLength - i;

              return (
                <BlockSwitch
                  setRef={refBlock => (this.refBlocks[title] = refBlock)}
                  key={get(block, 'sys.id', i)}
                  block={block}
                  z={blockZIndex}
                  {...this.props}
                />
              );
            })}
        </div>
      </Fragment>
    );
  }
}

export default LocationDetailView;
