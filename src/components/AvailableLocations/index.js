import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import { Button } from 'components/base';

import styles from './AvailableLocations.scss';

const AvailableLocations = ({ flavor, block, z, setRef, drip, upperDrip }) => {
  const availableLocations = get(flavor, 'availableLocations', []);
  const fields = get(block, 'fields', {});
  const blockTitle = get(fields, 'title', '');
  const backgroundColor = get(fields, 'backgroundColor', 'white');

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['AvailableLocations'],
        styles[`AvailableLocations--${backgroundColor}`],
        {
          drip: drip,
          'upper-drip': upperDrip
        }
      )}
    >
      <h2 className="block-headline center mb3">{blockTitle}</h2>
      <div className="w100 flex justify-center items-center">
        <div
          className={cx(
            styles['AvailableLocations__button-container'],
            'flex flex-wrap justify-center items-center'
          )}
        >
          {availableLocations.map(location => {
            const fields = get(location, 'fields', {});
            const locationTitle = get(fields, 'title', '');
            const slug = get(fields, 'slug', '');
            const id = get(location, 'sys.id', '');

            return (
              <Button
                key={id}
                className={cx(
                  styles['AvailableLocations__button'],
                  'uppercase inline-flex m1'
                )}
                variant="primary-small"
                color="madison-blue"
                label={locationTitle}
                to={`/location/${slug}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

AvailableLocations.propTypes = {
  flavor: PropTypes.shape({
    availableLocations: PropTypes.array,
    contentBlocks: PropTypes.array,
    id: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string
  }),
  z: PropTypes.number,
  setRef: PropTypes.func,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      contentType: PropTypes.string,
      drip: PropTypes.bool,
      title: PropTypes.string
    }),
    sys: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

AvailableLocations.defaultProps = {
  flavor: {
    availableLocations: [],
    contentBlocks: [],
    id: '',
    image: '',
    label: '',
    slug: '',
    title: ''
  },
  z: 1,
  setRef: () => {},
  block: {
    fields: {
      contentType: '',
      drip: false,
      title: ''
    },
    sys: {
      id: ''
    }
  }
};

export default AvailableLocations;
