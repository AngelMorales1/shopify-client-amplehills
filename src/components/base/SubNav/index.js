import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './SubNav.scss';
import { Button } from 'components/base';

class SubNav extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const { className, menuList, onClick } = this.props;
    return (
      <div className="w100 flex flex-row justify-center fixed z-sub-nav">
        <div
          className={cx(
            styles['SubNav__button'],
            className,
            'bg-white inline-flex flex-row items-center justify-center px2'
          )}
        >
          {menuList.map((menu, i) => (
            <Button
              key={`${menu}-${i}`}
              variant="no-style"
              className={cx(styles['SubNav__menu'], 'copy text-peach bold px2')}
              onClick={() => onClick(menu)}
              label={menu}
            />
          ))}
        </div>
      </div>
    );
  }
}

SubNav.propTypes = {};

SubNav.defaultProps = {};

export default SubNav;
