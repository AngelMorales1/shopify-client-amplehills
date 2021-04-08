import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import memoize from 'lodash/memoize';
import { VscLoading, VscLocation } from 'react-icons/vsc';

import Global from 'constants/Global';
import getDistanceBetweenLocations from 'utils/getDistanceBetweenLocations';

import { Button, Dropdown, PortableText, TextField } from 'components/base';
import styles from './InStores.scss';

class InStores extends Component {
  state = {
    itemsToShow: 10,
    activeFilter: '',
    address: '',
    coords: null,
    radius: 10,
    isPending: true,
    isConfirmed: false,
    isUsingGeolocation: false,
    currentBreakpoint: Global.breakpoints.medium.label,
    email: '',
    grocery: ''
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();

    if ('geolocation' in window.navigator) {
      const { coords } = this.state;

      if (!coords) {
        window.navigator.geolocation.getCurrentPosition(
          position =>
            this.setState({
              coords: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
              },
              isPending: false,
              isConfirmed: true,
              isUsingGeolocation: true
            }),
          error =>
            this.setState({
              ...this.state,
              coords: null,
              isPending: false,
              isConfirmed: false,
              isUsingGeolocation: false
            }),
          {
            maximumAge: 1000 * 60 * 60 * 24 * 30,
            timeout: 1000 * 10
          }
        );
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  handleFilterButtonClick = filter => {
    if (filter === this.state.activeFilter || filter === 'All') {
      return this.setState({ activeFilter: '' });
    }

    return this.setState({ activeFilter: filter });
  };

  handleLoadMore = () => {
    this.setState(state => ({
      ...state,
      itemsToShow: this.state.itemsToShow + 10
    }));
  };

  handleSearch = () => {
    console.log('search', this.state.address);
  };

  handleChangeAddress = address =>
    this.setState(state => ({ ...state, address }));
  handleRadiusChange = radius => this.setState(state => ({ ...state, radius }));
  handleClear = () =>
    this.setState(state => ({
      ...state,
      coords: null,
      isPending: false,
      isConfirmed: false,
      isUsingGeolocation: false
    }));

  locationsByDistance = memoize((coords, retailLocations) =>
    retailLocations.reduce((locationsByDistance, retailer) => {
      const milesBetweenLocations = !!coords
        ? getDistanceBetweenLocations(
            retailer.geopoint.lat,
            retailer.geopoint.lng,
            coords.latitude,
            coords.longitude
          )
        : 0;

      locationsByDistance.push({
        distance: milesBetweenLocations,
        retailer
      });

      return locationsByDistance;
    }, [])
  );

  render() {
    const { retailLocations, content } = this.props;
    const {
      activeFilter,
      currentBreakpoint,
      coords,
      address,
      radius,
      itemsToShow,
      isPending,
      isConfirmed,
      isUsingGeolocation
    } = this.state;
    const { medium } = Global.breakpoints;

    const uniqueFilters = {}; // TO-DO
    const locationsByDistance = this.locationsByDistance(
      coords,
      retailLocations
    );
    const filteredLocations = locationsByDistance
      .filter(retailer => retailer.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return (
      <div>
        <div className="bg-sky-blue py4 px3 flex flex-column justify-center items-center drip">
          <h1 className="block-headline center mb3">{content.title}</h1>
          <div className="markdown-block center text-container-width">
            <PortableText blocks={content.body} />
          </div>
          <div className="relative my2 col-12 md-col-6 lg-col-4">
            <TextField
              type="text"
              className="col-12"
              name="zip"
              placeholder="Enter your zip code"
              variant="primary-search"
              disabled={isPending}
              value={!!isUsingGeolocation ? 'Current Location' : address}
              onChange={this.handleChangeAddress}
            />
            <div
              className={cx(
                styles['InStores__input-control'],
                'flex items-center'
              )}
            >
              {isPending && (
                <div
                  className={cx(
                    styles['InStores__loader'],
                    'text-dusty-gray mr1'
                  )}
                >
                  <VscLoading />
                </div>
              )}
              {isConfirmed ? (
                <Button
                  key="1-button"
                  variant="underline-peach"
                  className="text-peach mr1"
                  label="Clear"
                  onClick={this.handleClear}
                />
              ) : (
                <Button
                  key="2-button"
                  disabled={isPending}
                  variant="primary-small"
                  label="Search"
                  color="madison-blue"
                  onClick={this.handleSearch}
                />
              )}
            </div>
          </div>
          <div
            className={cx(
              styles['InStores__radius-dropdown-container'],
              'col-12 center'
            )}
          >
            <span className="small">
              Showing {filteredLocations.length} retailers within
            </span>
            <Dropdown
              textAlignCenter={true}
              color="peach"
              textColor="peach"
              className={cx(
                styles['InStores__radius-dropdown'],
                'wauto mx1 small inline-block'
              )}
              variant="underline"
              value={this.state.radius}
              options={[5, 10, 25, 100].map(distance => {
                return { label: `${distance} mi`, value: distance };
              })}
              onChange={radius => this.handleRadiusChange(radius.value)}
            />
            <span className="small xs-hide sm-hide">of your location</span>
          </div>
          <div className="hide flex flex-row justify-center flex-wrap w100">
            {currentBreakpoint === medium.label ? (
              Object.keys(uniqueFilters).map(filter => (
                <Button
                  key={filter}
                  onClick={() => this.handleFilterButtonClick(filter)}
                  className="m1"
                  color={
                    activeFilter === filter
                      ? 'clear-madison-blue-border'
                      : 'madison-blue'
                  }
                  variant="primary-small"
                  label={filter}
                />
              ))
            ) : (
              <Dropdown
                textAlignCenter={true}
                color="peach"
                textColor="madison-blue"
                bgColor="clear-madison-blue-border"
                className="w100"
                selectClassName="w100"
                variant="secondary"
                value={this.state.activeFilter}
                options={['All']
                  .concat(Object.keys(uniqueFilters))
                  .map(filter => {
                    return { label: filter, value: filter };
                  })}
                onChange={filter => this.handleFilterButtonClick(filter.value)}
              />
            )}
          </div>
        </div>
        <div className="mt3 py4 px3 flex flex-column items-center">
          {filteredLocations.slice(0, itemsToShow).map((retailer, i) => (
            <div
              key={retailer.retailer.address}
              className={cx(
                styles['InStores__local-retailer-container'],
                'flex form-container-width justify-between w100 my2 p3 transition-slide-up-large'
              )}
              style={{ animationDelay: `${(i % 10) * 0.1}s` }}
            >
              <div
                className={cx(
                  styles['InStores__local-retailer-text-container']
                )}
              >
                <p className="bold mb1">{retailer.retailer.name}</p>
                <p>{`${retailer.retailer.address}, ${retailer.retailer.city}, ${
                  retailer.retailer.state
                } ${retailer.retailer.zip}`}</p>
                {!!retailer.distance && (
                  <p className="mt1 text-dusty-gray">
                    {retailer.distance} miles away
                  </p>
                )}
              </div>
              <Button
                className={cx(styles['InStores__local-retailer-button'])}
                variant="primary-small"
                color="peach"
                label="Get Directions"
              />
            </div>
          ))}
          {!filteredLocations.length && (
            <div
              className={cx(
                styles['InStores__no-results'],
                'flex flex-column mt3 transition-slide-up-large'
              )}
            >
              <span className="block-headline center mb3">
                {content.noResults.title}
              </span>
              <div className="markdown-block center text-container-width">
                <PortableText blocks={content.noResults.body} />
              </div>
              <div className="mt1">
                <TextField
                  className="mt2"
                  placeholder="Email address"
                  variant="light-gray"
                  value={this.state.email}
                />
                <TextField
                  className="mt2"
                  placeholder="Grocery store of choice"
                  variant="light-gray"
                  value={this.state.grocery}
                />
                <p
                  className={cx(
                    styles['InStores__summary'],
                    'mt2 small center'
                  )}
                >
                  Requesting pints within <strong>{radius} miles</strong> of
                  <strong className="nowrap">
                    <div
                      className={cx(
                        styles['InStores__location-pin'],
                        'inline-block'
                      )}
                    >
                      <VscLocation />
                    </div>
                    <span className="text-peach">
                      {!!coords ? 'Current Location' : address}
                    </span>
                  </strong>
                </p>
                <Button
                  className={cx(
                    styles['InStores__submit-email-button'],
                    'mt3 px4 mx-auto'
                  )}
                  variant="primary"
                  color="madison-blue"
                  label="Submit"
                  disabled={!!this.state.email && !!this.state.grocery}
                  onClick={this.handleSubmitEmail}
                />
              </div>
            </div>
          )}
          {itemsToShow < filteredLocations.length && (
            <div className="InStores__load-more">
              <div className="mt2 mb4">
                <strong>
                  Showing {itemsToShow} of {filteredLocations.length} results
                </strong>
              </div>
              <Button
                className={cx(styles['InStores__pagination-button'], 'mx-auto')}
                variant="primary"
                color="madison-blue"
                label="Load More"
                onClick={this.handleLoadMore}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

InStores.propTypes = {
  localRetailers: PropTypes.object,
  text: PropTypes.string
};

InStores.defaultProps = {
  localRetailers: null,
  text: ''
};

export default InStores;
