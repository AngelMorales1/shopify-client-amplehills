import React, { Component } from 'react';
import get from 'utils/get';
import Global from 'constants/Global';

import { Button, Dropdown } from 'components/base';
import FlavorCard from 'components/FlavorCard';

class FlavorLandingView extends Component {
  state = {
    activeFilter: 'All',
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
      window.innerWidth <= medium.upperbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const flavors = get(this, 'props.flavors', {});
    const filteredFlavor = get(flavors, 'flavors', []).filter(
      flavor =>
        get(flavor, `filters.${this.state.activeFilter}`, false) ||
        this.state.activeFilter === 'All'
    );

    return (
      <div className="bg-pastel-green py4 px3">
        <div className="mx-auto flex flex-column justify-center">
          <h2 className="block-headline center mb3">Our Flavors</h2>
          {this.state.currentBreakpoint === 'medium' ? (
            <div className="flex flex-row flex-wrap justify-center mb2">
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
              options={['All'].concat(flavors.collectedFilters).map(filter => {
                return { label: filter, value: filter };
              })}
              onChange={filter => this.setState({ activeFilter: filter.value })}
            />
          )}
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

export default FlavorLandingView;
