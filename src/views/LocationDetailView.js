import React, { Component } from 'react';
import get from 'utils/get';

import LocationDetailHero from 'components/LocationDetailHero';
import BlockSwitch from 'components/BlockSwitch';

class LocationDetailView extends Component {
  render() {
    const { model, blocks, location, locationGeoJSON } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div>
        <LocationDetailHero
          location={location}
          locationGeoJSON={locationGeoJSON}
        />
        {blocks &&
          blocks.map((block, i) => (
            <BlockSwitch
              key={`${i}-${get(block, 'sys.id', i)}`}
              block={block}
              z={blocks.length - i}
              {...this.props}
            />
          ))}
      </div>
    );
  }
}

export default LocationDetailView;
