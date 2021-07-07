import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import Global from 'constants/Global';

import styles from './FlavorsLanding.scss';
import { Button, Dropdown } from 'components/base';
import FlavorCard from 'components/FlavorCard';

const FILTERS = {
  shopSpecific: 'Shop-Specific',
  shipsNationwide: 'Ships Nationwide',
  'mix-ins': "Full O' Mix-ins",
  chocolatey: 'Chocolatey'
};

const DIETARY_RESTRICTIONS = {
  dietaryRestrictions: 'Dietary Restrictions',
  glutenFree: 'Gluten Free',
  vegan: 'Vegan',
  nuts: 'Contains Nuts'
};

class FlavorLanding extends Component {
  state = {
    activeFilter: 'All',
    activeDietaryRestrictions: 'Dietary Restrictions',
    currentBreakpoint: Global.breakpoints.medium.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
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

  handleDietaryRestrictionsClick = value => {
    if (value === 'None') {
      return this.setState({ activeDietaryRestrictions: '' });
    }

    return this.setState({ activeDietaryRestrictions: value });
  };

  render() {
    const { setRef, drip, upperDrip, z } = this.props;

    const flavors = get(this, 'props.flavors', {});
    const filteredFlavors = get(flavors, 'flavors', [])
      .filter(flavor => flavor.showOnFlavorsPage)
      .filter(flavor => {
        const filtered =
          this.state.activeFilter === 'All' ||
          flavor.filters.includes(this.state.activeFilter);
        const diet =
          this.state.activeDietaryRestrictions === 'Dietary Restrictions' ||
          flavor.dietaryRestrictions.includes(
            this.state.activeDietaryRestrictions
          );

        return filtered && diet;
      })
      .sort((a, b) => a.order - b.order);

    return (
      <div
        className={cx('bg-light-turquoise py4 px3', {
          drip: drip,
          'upper-drip': upperDrip
        })}
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
      >
        <div className="mx-auto flex flex-column justify-center">
          <h2 className="block-headline center mb4">Our Flavors</h2>
          <div
            className={cx(
              styles['FlavorsLanding__filter-container'],
              'flex justify-center relative'
            )}
          >
            {this.state.currentBreakpoint === 'medium' ? (
              <div
                className={cx(
                  styles['FlavorsLanding__filter-button-container'],
                  'w100 flex flex-row flex-wrap justify-center'
                )}
              >
                <Button
                  className={cx(styles['FlavorsLanding__filter-button'], 'm1')}
                  color={
                    this.state.activeFilter === 'All'
                      ? 'clear-madison-blue-border'
                      : 'madison-blue'
                  }
                  label="All"
                  variant="primary-small"
                  onClick={() =>
                    this.setState({
                      activeFilter: 'All'
                    })
                  }
                />
                {flavors.collectedFilters.map(filter => {
                  const color =
                    this.state.activeFilter === filter
                      ? 'clear-madison-blue-border'
                      : 'madison-blue';

                  return (
                    <Button
                      className={cx(
                        styles['FlavorsLanding__filter-button'],
                        'm1'
                      )}
                      color={color}
                      key={filter}
                      label={FILTERS[filter]}
                      variant="primary-small"
                      onClick={() =>
                        this.setState({
                          activeFilter: filter
                        })
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <Dropdown
                className="mb2 z-2"
                selectClassName="w100"
                variant="underline"
                value={{
                  label:
                    this.state.activeFilter === 'All'
                      ? 'All'
                      : FILTERS[this.state.activeFilter],
                  value: this.state.activeFilter
                }}
                options={['All']
                  .concat(flavors.collectedFilters)
                  .map(filter => {
                    if (filter === 'All') return { label: 'All', value: 'All' };
                    return { label: FILTERS[filter], value: filter };
                  })}
                onChange={filter =>
                  this.setState({ activeFilter: filter.value })
                }
              />
            )}
            <div
              className={cx(
                styles['FlavorsLanding__dietary-restrictions'],
                'flex mb2 z-1'
              )}
            >
              <Dropdown
                fixedWidth={true}
                selectClassName="w100"
                variant="underline"
                placeholder="Dietary Restrictions"
                textColor="peach"
                value={
                  this.state.activeDietaryRestrictions ===
                  'Dietary Restrictions'
                    ? {
                        label: 'Dietary Restrictions',
                        value: 'Dietary Restrictions'
                      }
                    : {
                        label:
                          DIETARY_RESTRICTIONS[
                            this.state.activeDietaryRestrictions
                          ],
                        value: this.state.activeDietaryRestrictions
                      }
                }
                options={['Dietary Restrictions']
                  .concat(flavors.collectedDietaryRestrictions)
                  .map(filter => {
                    let label = '';

                    if (filter === 'glutenFree') label = 'Gluten Free';
                    if (filter === 'vegan') label = 'Vegan';
                    if (filter === 'nuts') label = 'Contains Nuts';
                    if (filter === 'Dietary Restrictions')
                      label = 'Dietary Restrictions';

                    return { label, value: filter };
                  })}
                onChange={filter =>
                  this.handleDietaryRestrictionsClick(filter.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {filteredFlavors.map((flavor, i) => (
              <FlavorCard key={get(flavor, 'id', i)} flavor={flavor} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

FlavorLanding.propTypes = {
  flavors: PropTypes.shape({
    collectedDietaryRestrictions: PropTypes.array,
    collectedFilters: PropTypes.array,
    flavors: PropTypes.arrayOf(
      PropTypes.shape({
        dietaryRestrictions: PropTypes.object,
        filters: PropTypes.object,
        id: PropTypes.string,
        image: PropTypes.string,
        label: PropTypes.string,
        title: PropTypes.string
      })
    )
  })
};

FlavorLanding.defaultProps = {
  flavors: {
    collectedDietaryRestrictions: [],
    collectedFilters: [],
    flavors: [
      {
        dietaryRestrictions: null,
        filters: null,
        id: '',
        image: '',
        label: '',
        title: ''
      }
    ]
  }
};

export default FlavorLanding;
