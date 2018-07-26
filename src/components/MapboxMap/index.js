import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import cx from 'classnames';

class MapboxMap extends Component {
  state = {
    mapId: uuid(),
    map: null,
    source: null,
    cluster: null,
    layer: null,
    bounds: null,
    loaded: false
  };

  async componentDidMount() {
    await this.initializeMap();
    this.addSource();
    this.addLayers();
    if (this.props.collections.length) {
      this.setMapProperties();
    }
    this.bindEventListeners();
    await this.setBounds();
    this.zoomToBounds();
    this.props.onLoad();
    this.setState({
      loaded: true
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.state.loaded) return;

    if (prevProps.collections !== this.props.collections) {
      this.setMapProperties();
      if (prevProps.featureIdZoomTo === this.props.featureIdZoomTo) {
        this.setBounds().then(this.zoomToBounds);
      }
    }

    if (prevProps.featureIdZoomTo !== this.props.featureIdZoomTo) {
      if (this.props.featureIdZoomTo === null) {
        this.zoomToBounds();
      } else {
        const feature = this.featureFromId(this.props.featureIdZoomTo);
        if (feature) this.zoomToFeature(feature);
      }
    }
  }

  componentWillUnmount() {
    if (this.state.map) this.state.map.remove();
  }

  initializeMap() {
    return new Promise((resolve, reject) => {
      const { styleUrl } = this.props;
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: this.state.mapId,
        style: styleUrl
      });
      map.on('load', () => {
        this.setState({ map }, () => resolve(map));
      });
    });
  }

  addSource() {
    const {
      featureCollection,
      cluster,
      clusterMaxZoom,
      clusterRadius
    } = this.props;
    const source = this.state.map.addSource('source', {
      type: 'geojson',
      data: featureCollection,
      cluster,
      clusterMaxZoom,
      clusterRadius
    });
    this.setState({ source });
  }

  addLayers() {
    const { defaultIcon, iconSize, textSize, textColor } = this.props;
    const layer = this.state.map.addLayer({
      id: 'layer',
      type: 'symbol',
      source: 'source',
      layout: {
        'icon-allow-overlap': true,
        'icon-image': defaultIcon,
        'icon-size': iconSize
      },
      paint: {
        'icon-opacity': ['match', ['get', 'id'], '', 0.5, 1]
      }
    });

    const cluster = this.props.cluster
      ? this.state.map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'source',
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Bold'],
            'text-size': textSize
          },
          paint: {
            'text-color': textColor
          }
        })
      : null;
    this.setState({ layer, cluster });
  }

  setMapProperties() {
    this.setIconImageProperty();

    if (this.props.cluster) {
      this.resetMapSource();
    } else {
      this.setVisibilityProperty();
    }
  }

  setIconImageProperty() {
    const { defaultIcon } = this.props;

    this.state.map.setLayoutProperty('layer', 'icon-image', [
      'match',
      ['get', 'id'],
      ...this.featuresWithoutDefaultIcon(),
      defaultIcon
    ]);
  }

  resetMapSource() {
    const hiddenFeatures = this.featuresNotVisible();
    const filteredFeatures = hiddenFeatures.length
      ? this.props.featureCollection.features.filter(feature => {
          const { id } = feature.properties;
          return !hiddenFeatures.includes(id);
        })
      : [];

    const filteredGeoJSON = {
      type: 'FeatureCollection',
      features: filteredFeatures
    };

    this.state.map.getSource('source').setData(filteredGeoJSON);
  }

  setVisibilityProperty() {
    this.state.map.setFilter('layer', [
      '!in',
      'id',
      ...this.featuresNotVisible()
    ]);
  }

  setFeatureHoverOpacityProperty(featureId, opacity) {
    this.state.map.setPaintProperty('layer', 'icon-opacity', [
      'match',
      ['get', 'id'],
      featureId,
      opacity,
      1
    ]);
  }

  featuresWithoutDefaultIcon() {
    const { collections } = this.props;
    return collections
      .filter(collection => collection.icon)
      .reduce((agg, collection) => {
        const featureIds = this.featureIdsFromCollectionFilter(collection);
        return agg.concat(featureIds, collection.icon);
      }, []);
  }

  featuresNotVisible() {
    const { collections } = this.props;

    return collections
      .filter(collection => {
        return typeof collection.visible === 'boolean' && !collection.visible;
      })
      .reduce((agg, collection) => {
        const featureIds = this.featureIdsFromCollectionFilter(collection);
        return agg.concat(...featureIds);
      }, []);
  }

  featureIdsFromCollectionFilter(collection) {
    const {
      featureCollection: { features }
    } = this.props;
    let featureIds;

    // If collection has featureIds, add return sanitized ids directly from
    // array.
    if (collection.filter.ids && collection.filter.ids.length) {
      // Translates null values to empty strings, as mapbox does not except null
      // values in expressions.
      featureIds = [collection.filter.ids.map(id => (id === null ? '' : id))];

      // If a collection is provided an empty array of featureIds provide an
      // empty array with a string
    } else if (collection.filter.ids && !collection.filter.ids.length) {
      featureIds = [['']];

      // If collection has key and value, look up feature ids by those keys
      // and values.
    } else if (collection.filter.key && collection.filter.value) {
      featureIds = [
        features
          .filter(feature => {
            return (
              feature.properties[collection.filter.key] ===
              collection.filter.value
            );
          })
          .map(feature => feature.properties.id)
      ];

      // If collection has only key, look up features that have that key.
    } else if (collection.filter.key) {
      featureIds = [
        features
          .filter(feature => {
            return feature.properties[collection.filter.key];
          })
          .map(feature => feature.properties.id)
      ];

      // Else, throw error.
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'A collection must include an array of featureIds or a findBy key.'
        );
      }
    }

    return featureIds;
  }

  bindEventListeners() {
    const { onClickFeature, hoverFade } = this.props;
    const { map } = this.state;
    map.on('click', 'layer', e => {
      onClickFeature(e.features[0]);
    });
    map.on('mouseenter', 'layer', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    if (hoverFade) {
      map.on('mousemove', 'layer', e => {
        this.setFeatureHoverOpacityProperty(e.features[0].properties.id, 0.7);
      });
    }
    map.on('mouseleave', 'layer', () => {
      map.getCanvas().style.cursor = '';
      if (hoverFade) {
        this.setFeatureHoverOpacityProperty('', 0.7);
      }
    });
  }

  setBounds() {
    return new Promise((resolve, reject) => {
      const { featureCollection } = this.props;
      const featuresNotVisible = this.featuresNotVisible();

      const visibleFeatureCoordinates = featureCollection.features
        .filter(feature => !featuresNotVisible.includes(feature.properties.id))
        .map(feature => feature.geometry.coordinates);

      const boundaryCoordinates = visibleFeatureCoordinates.length
        ? visibleFeatureCoordinates
        : featureCollection.features.map(feature => {
            return feature.geometry.coordinates;
          });

      const bounds = boundaryCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(boundaryCoordinates[0], boundaryCoordinates[0]));
      this.setState({ bounds }, () => resolve());
    });
  }

  zoomToBounds = () => {
    this.state.map.fitBounds(this.state.bounds, {
      padding: this.props.mapPadding
    });
  };

  zoomToFeature(feature) {
    this.state.map.flyTo({
      zoom: 10,
      speed: 1,
      center: feature.geometry.coordinates
    });
  }

  featureFromId(id) {
    const {
      featureCollection: { features }
    } = this.props;
    return features.find(feature => feature.properties.id === id);
  }

  render() {
    const { className } = this.props;
    const classes = cx('w100 h100', { [className]: className });

    return <figure id={this.state.mapId} className={classes} />;
  }
}

MapboxMap.propTypes = {
  featureCollection: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  iconSize: PropTypes.number,
  cluster: PropTypes.bool,
  clusterMaxZoom: PropTypes.number,
  clusterRadius: PropTypes.number,
  textSize: PropTypes.number,
  textColor: PropTypes.string,
  mapPadding: PropTypes.number,
  onClickFeature: PropTypes.func,
  defaultIcon: PropTypes.string.isRequired,
  styleUrl: PropTypes.string.isRequired,
  collections: PropTypes.arrayOf(PropTypes.object),
  hoverFade: PropTypes.bool,
  className: PropTypes.string,
  onLoad: PropTypes.func
};

MapboxMap.defaultProps = {
  featureCollection: {
    type: 'FeatureCollection',
    features: []
  },
  iconSize: 1,
  cluster: false,
  clusterMaxZoom: null,
  clusterRadius: null,
  textSize: 12,
  textColor: '#000000',
  mapPadding: 100,
  onLoad: () => {},
  onClickFeature: () => {},
  defaultIcon: 'star',
  styleUrl: 'mapbox://styles/mapbox/streets-v9',
  collections: [],
  hoverFade: false,
  className: undefined
};

export default MapboxMap;
