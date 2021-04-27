import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import memoize from 'lodash/memoize';
import { VscLoading, VscLocation } from 'react-icons/vsc';

import Global from 'constants/Global';
import * as Status from 'constants/Status';
import getDistanceBetweenLocations from 'utils/getDistanceBetweenLocations';
import getUrlParam from 'utils/getUrlParam';

import { Button, Dropdown, PortableText, TextField } from 'components/base';
import styles from './InStores.scss';

class InStores extends Component {
  state = {
    itemsToShow: 10,
    activeFilter: '',
    address: '',
    coords: null,
    radius: 10,
    isPending: false,
    isConfirmed: false,
    isUsingGeolocation: false,
    currentBreakpoint: Global.breakpoints.medium.label,
    email: '',
    grocery: '',
    hasSubmittedNoResultsForm: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();

    const search = getUrlParam('location');
    if (search && search === 'current') {
      this.handleGeolocate();
    }

    if (search && search !== 'current') {
      this.setState({ address: search }, this.handleSearch);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.address &&
      this.props.searchResult &&
      this.props.searchResult.coordinates &&
      (!this.state.coords ||
        this.props.searchResult.coordinates[0] !== this.state.coords.longitude)
    ) {
      this.setState({
        coords: {
          longitude: this.props.searchResult.coordinates[0],
          latitude: this.props.searchResult.coordinates[1]
        }
      });
    }

    if (
      prevProps.klaviyoListSignupStatus === Status.PENDING &&
      this.props.klaviyoListSignupStatus === Status.FULFILLED
    ) {
      this.setState({ hasSubmittedNoResultsForm: true });
    }
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  handleGeolocate = () => {
    this.setState({ isUsingGeolocation: true, isPending: true });

    if ('geolocation' in window.navigator) {
      const { coords } = this.state;

      if (!coords) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              coords: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
              },
              isPending: false,
              isConfirmed: true,
              isUsingGeolocation: true
            });
          },
          error => {
            this.setState({
              ...this.state,
              coords: null,
              isPending: false,
              isConfirmed: false,
              isUsingGeolocation: false
            });
          },
          {
            maximumAge: 1000 * 60 * 60 * 24 * 30,
            timeout: 1000 * 10
          }
        );
      }
    }
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
    this.props.actions.getSearchResult(this.state.address);
  };

  handleChangeAddress = address =>
    this.setState(state => ({ ...state, address }));
  handleChangeEmail = email => this.setState(state => ({ ...state, email }));
  handleChangeGrocery = grocery =>
    this.setState(state => ({ ...state, grocery }));
  handleRadiusChange = radius => this.setState(state => ({ ...state, radius }));
  handleClear = () => {
    this.props.actions.getSearchResult(null);
    this.setState(state => ({
      ...state,
      coords: null,
      isPending: false,
      isConfirmed: false,
      isUsingGeolocation: false,
      address: ''
    }));
  };

  handleSubmitNoResults = () => {
    const LIST_ID = 'S8MVV9';
    const { email, grocery, radius, address, coords } = this.state;

    this.props.actions.klaviyoListSignup(email, LIST_ID, {
      grocery,
      radius,
      address,
      coords
    });
  };

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
    const {
      retailLocations,
      content,
      searchResult,
      getSearchResultStatus
    } = this.props;
    const {
      activeFilter,
      currentBreakpoint,
      coords,
      address,
      radius,
      itemsToShow,
      isPending,
      isConfirmed,
      isUsingGeolocation,
      hasSubmittedNoResultsForm
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
              placeholder="Enter your ZIP code"
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
              {isPending ||
                (getSearchResultStatus === Status.PENDING && (
                  <div
                    className={cx(
                      styles['InStores__loader'],
                      'text-dusty-gray mr1'
                    )}
                  >
                    <VscLoading />
                  </div>
                ))}
              {!isPending && !address && (
                <Button
                  ariaLabel="Use current location"
                  title="Use current location"
                  variant="no-style"
                  onClick={this.handleGeolocate}
                  className={cx(styles['InStores__current-location-button'])}
                >
                  <VscLocation />
                </Button>
              )}
              {(isConfirmed && isUsingGeolocation) ||
              (address && searchResult.coordinates) ? (
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
              Showing {filteredLocations.length} stores within
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
                to={`https://maps.google.com/?q=${retailer.retailer.address}, ${
                  retailer.retailer.city
                }, ${retailer.retailer.state} ${retailer.retailer.zip}`}
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
                {hasSubmittedNoResultsForm
                  ? 'Thank You'
                  : content.noResults.title}
              </span>
              <div className="markdown-block center text-container-width">
                {hasSubmittedNoResultsForm ? (
                  <p>
                    We will reach out to your when we begin selling pints in
                    your area. Stay tuned!
                  </p>
                ) : (
                  <PortableText blocks={content.noResults.body} />
                )}
              </div>
              {!hasSubmittedNoResultsForm && (
                <div className="mt1">
                  <TextField
                    className="mt2"
                    placeholder="Email address"
                    variant="light-gray"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                  />
                  <TextField
                    className="mt2"
                    placeholder="Grocery store of choice"
                    variant="light-gray"
                    value={this.state.grocery}
                    onChange={this.handleChangeGrocery}
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
                        {!!address ? address : 'Current Location'}
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
                    disabled={!this.state.email || !this.state.grocery}
                    onClick={this.handleSubmitNoResults}
                  />
                </div>
              )}
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
