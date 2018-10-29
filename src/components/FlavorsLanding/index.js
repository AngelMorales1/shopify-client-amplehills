import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import Global from 'constants/Global';

import styles from './FlavorsLanding.scss';
import { Button, Dropdown } from 'components/base';
import FlavorCard from 'components/FlavorCard';

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

  render() {
    const flavors = get(this, 'props.flavors', {});
    const filteredFlavor = get(flavors, 'flavors', []).filter(flavor => {
      if (
        this.state.activeFilter !== 'All' &&
        this.state.activeDietaryRestrictions !== 'Dietary Restrictions'
      ) {
        return (
          get(flavor, `filters.${this.state.activeFilter}`, false) &&
          get(
            flavor,
            `dietaryRestrictions.${this.state.activeDietaryRestrictions}`,
            false
          )
        );
      }

      if (this.state.activeFilter !== 'All') {
        return get(flavor, `filters.${this.state.activeFilter}`, false);
      }

      if (this.state.activeDietaryRestrictions !== 'Dietary Restrictions') {
        return get(
          flavor,
          `dietaryRestrictions.${this.state.activeDietaryRestrictions}`,
          false
        );
      }

      return true;
    });

    return (
      <div className="bg-pastel-green py4 px3 drip">
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
                  className="m1"
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
                      className="m1"
                      color={color}
                      key={filter}
                      label={filter}
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
                className="mb2"
                selectClassName="w100"
                variant="secondary"
                value={this.state.activeFilter}
                options={['All']
                  .concat(flavors.collectedFilters)
                  .map(filter => {
                    return { label: filter, value: filter };
                  })}
                onChange={filter =>
                  this.setState({ activeFilter: filter.value })
                }
              />
            )}
            <div
              className={cx(
                styles['FlavorsLanding__dietary-restrictions'],
                'flex mb2'
              )}
            >
              <Dropdown
                fixedWidth={true}
                selectClassName="w100"
                variant="small"
                color="peach"
                textColor="madison-blue"
                value={this.state.activeDietaryRestrictions}
                options={['Dietary Restrictions']
                  .concat(flavors.collectedDietaryRestrictions)
                  .map(filter => {
                    return { label: filter, value: filter };
                  })}
                onChange={filter =>
                  this.setState({ activeDietaryRestrictions: filter.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {filteredFlavor.map((flavor, i) => (
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
        dietaryRestrictions: {},
        filters: {},
        id: '',
        image: '',
        label: '',
        title: ''
      }
    ]
  }
};

export default FlavorLanding;
