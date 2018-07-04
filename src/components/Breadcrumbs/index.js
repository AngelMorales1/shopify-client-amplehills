import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import get from 'utils/get';

import { Image } from 'components/base';
import styles from './Breadcrumbs.scss';

const Breadcrumbs = ({ breadcrumbs, className }) => {
  if (!breadcrumbs.length) return null;

  return (
    <div className={cx(className, 'my3 px2 flex items-center text-peach')}>
      <div className="flex pr1 items-center">
        <Image
          className={styles['Breadcrumbs__arrow']}
          src="/assets/images/icon-arrow-left.svg"
        />
      </div>
      {breadcrumbs.map((crumb, i) => {
        const delimiter =
          i < breadcrumbs.length - 1 ? <span className="px1">/</span> : '';

        return (
          <span key={i}>
            <Link className="link-text" to={get(crumb, 'to', '')}>
              <span className="small">{get(crumb, 'label', '')}</span>
            </Link>
            {delimiter}
          </span>
        );
      })}
    </div>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string
    })
  ),
  className: PropTypes.string
};

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
  className: ''
};

export default Breadcrumbs;
