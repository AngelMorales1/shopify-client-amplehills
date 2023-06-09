import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Global from 'constants/Global';

import styles from './SubNav.scss';
import { Button } from 'components/base';

class SubNav extends Component {
  state = {
    activeMenu: '',
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);

    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
    window.removeEventListener('scroll', this.updateMenu);
  }

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint) {
      this.setState({ currentBreakpoint });
    }
  };

  onMenuClick = menuTitle => {
    this.setState({ activeMenu: menuTitle });
  };

  render() {
    const { className, menuList, onClick } = this.props;
    const { large } = Global.breakpoints;
    const currentBreakpointIsLarge =
      this.state.currentBreakpoint === large.label;

    return (
      <div
        className={cx(
          styles['SubNav'],
          'w100 flex-row justify-center z-sub-nav',
          className
        )}
      >
        {currentBreakpointIsLarge ? (
          <div
            className={cx(
              styles['SubNav__button'],
              'bg-white inline-flex flex-row items-center justify-center px2 pt1'
            )}
          >
            {menuList.map((menu, i) => (
              <Button
                key={menu}
                variant="no-style"
                className={cx(styles['SubNav__menu'], 'text-peach bold mx2')}
                onClick={() => {
                  onClick(menu);
                  this.onMenuClick(menu);
                }}
                label={menu}
              />
            ))}
          </div>
        ) : null}
        {
          // TO-DO: Re-enable this
          // ) : (
          //   <Dropdown
          //     className={cx(styles['SubNav__dropdown'], 'w100 mx2')}
          //     selectClassName="w100"
          //     variant="secondary"
          //     placeholder="Select menu"
          //     value={this.state.activeMenu ? this.state.activeMenu : null}
          //     options={menuList.map(menu => {
          //       return { label: menu, value: menu };
          //     })}
          //     onChange={filter => {
          //       onClick(filter.value);
          //       this.onMenuClick(filter.value);
          //     }}
          //     shadow={true}
          //   />
          // )}
        }
      </div>
    );
  }
}

SubNav.propTypes = {
  className: PropTypes.string,
  menuList: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
};

SubNav.defaultProps = {
  className: '',
  menuList: [''],
  onClick: () => {}
};

export default SubNav;
