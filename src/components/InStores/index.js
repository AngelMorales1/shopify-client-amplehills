import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import Global from 'constants/Global';

import { Button, Dropdown } from 'components/base';
import styles from './InStores.scss';

class InStores extends Component {
  state = {
    activeFilter: '',
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

  handleFilterButtonClick = filter => {
    if (filter === this.state.activeFilter || filter === 'All') {
      return this.setState({ activeFilter: '' });
    }

    return this.setState({ activeFilter: filter });
  };

  render() {
    const { localRetailers, text } = this.props;
    const { activeFilter, currentBreakpoint } = this.state;
    const { medium } = Global.breakpoints;
    const localRetailersValues = Object.values(localRetailers);
    const uniqueFilter = localRetailersValues.reduce(
      (uniqueFilters, localRetailer) => {
        const filter = localRetailer.filter.toUpperCase();
        if (!uniqueFilters[filter]) {
          uniqueFilters[filter] = true;
        }

        return uniqueFilters;
      },
      {}
    );

    const selectedLocalRetailers = activeFilter
      ? localRetailersValues.filter(
          retailer => retailer.filter.toUpperCase() === activeFilter
        )
      : localRetailersValues;

    return (
      <div>
        <div className="bg-iceberg py4 px3 flex flex-column justify-center items-center drip">
          <h2 className="block-headline center mb3">Local Retailers</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(text)
            }}
            className="markdown-block center text-container-width"
          />
          <div className="flex flex-row justify-center flex-wrap w100">
            {currentBreakpoint === medium.label ? (
              Object.keys(uniqueFilter).map(filter => (
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
                  .concat(Object.keys(uniqueFilter))
                  .map(filter => {
                    return { label: filter, value: filter };
                  })}
                onChange={filter => this.handleFilterButtonClick(filter.value)}
              />
            )}
          </div>
        </div>
        <div className="mt3 py4 px3 flex flex-column items-center">
          {selectedLocalRetailers.map((localRetailer, i) => {
            return (
              <div
                key={get(localRetailer, 'uuid', i)}
                className={cx(
                  styles['InStores__local-retailer-container'],
                  'flex form-container-width justify-between w100 my2 p3'
                )}
              >
                <div
                  className={cx(
                    styles['InStores__local-retailer-text-container']
                  )}
                >
                  <p className="bold mb1">{localRetailer.title}</p>
                  <p>{`${get(localRetailer, 'address', '')}, ${get(
                    localRetailer,
                    'city',
                    ''
                  )}, ${get(localRetailer, 'state', '')} ${get(
                    localRetailer,
                    'zip',
                    ''
                  )}`}</p>
                </div>
                <Button
                  className={cx(styles['InStores__local-retailer-button'])}
                  variant="primary-small"
                  color="peach"
                  label={localRetailer.number}
                />
              </div>
            );
          })}
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
  localRetailers: {},
  text: ''
};

export default InStores;
