import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import imageModel from 'models/imageModel';
import styles from './LocationDetailHero.scss';
import { Image, Button } from 'components/base';

const LocationDetailHero = ({ location }) => {
  return (
    <div className={cx(styles['LocationDetailHero'], 'flex bg-bees-wax')}>
      <div
        className="col col-12 md-col-6 square"
        style={{
          background: `url(${contentfulImgUtil(
            get(location, 'image', ''),
            '1600'
          )}) no-repeat center`,
          backgroundSize: 'cover'
        }}
      />
      <div className="flex flex-column items-center justify-center col col-12 md-col-6 py4 px3">
        <div
          className={cx(
            styles['LocationDetailHero__content-container'],
            'col-12 md-col-9 mx-auto flex-column justify-around items-center'
          )}
        >
          <h2 className="block-headline my4">{location.title}</h2>
          <div
            className={cx(
              styles['LocationDetailHero__content-detail-container'],
              'flex'
            )}
          >
            <div className="col-6 pr2 mb3">
              <p className="uppercase text-peach bold copy mb1">info</p>
              <p className="block-subheadline">{location.address1}</p>
              <p className="block-subheadline">{`${location.city}, ${
                location.state
              } ${location.zip}`}</p>
            </div>
            <div className="col-12 md-col-6 mb4">
              <p className="uppercase text-peach bold copy mb1">hours</p>
              {location.sortedHours.map((hour, i) => {
                const key = Object.keys(hour);
                return (
                  <div
                    key={`${key}-${i}`}
                    className="flex flex-row justify-between"
                  >
                    <p className="bold block-subheadline mr1">{key}</p>
                    <p className="block-subheadline">{hour[key]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={cx(
            styles['LocationDetailHero__button-container'],
            'flex flex-wrap justify-center col-12 md-col-11 mx-auto'
          )}
        >
          <div className={cx(styles['LocationDetailHero__button'], 'my1 mx1')}>
            <Button
              className="uppercase justify-center"
              color="madison-blue"
              variant="primary-small"
              label="book a class"
              to="/contact"
            />
          </div>
          <div className={cx(styles['LocationDetailHero__button'], 'my1 mx1')}>
            <Button
              className="uppercase justify-center"
              color="madison-blue"
              variant="primary-small"
              label="book a party"
              to="/contact"
            />
          </div>
          <div className={cx(styles['LocationDetailHero__button'], 'my1 mx1')}>
            <Button
              className="uppercase justify-center"
              color="madison-blue"
              variant="primary-small"
              label="order a cake"
              to="/contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

LocationDetailHero.propTypes = {};

LocationDetailHero.defaultProps = {};

export default LocationDetailHero;
