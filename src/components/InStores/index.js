import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';

import { Button } from 'components/base';
import styles from './InStores.scss';

class InStores extends Component {
  state = {
    activeFilter: ''
  };

  handleFilterButtonClick = filter => {
    if (filter === this.state.activeFilter) {
      return this.setState({ activeFilter: '' });
    }

    return this.setState({ activeFilter: filter });
  };

  render() {
    const { localRetailers, text } = this.props;
    const { activeFilter } = this.state;
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
          <div className="flex flex-row">
            {Object.keys(uniqueFilter).map(filter => (
              <Button
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
            ))}
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

export default InStores;
