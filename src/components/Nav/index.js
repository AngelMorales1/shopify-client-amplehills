import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <div className="mx0 my3 px4 flex clearfix">
        <div className={`col col-4 flex justify-start ${styles['left-side']}`}>
          <NavLink exact to="/Location" className="flex ml4 link-text">
            Location
          </NavLink>
          <NavLink exact to="/Contact" className="flex ml4 link-text">
            Contact
          </NavLink>
        </div>
        <div className="col col-4">
          <NavLink exact to="/" className="flex justify-center">
            <img src="/assets/images/ample-hills-logo.svg" />
          </NavLink>
        </div>
        <div
          className={`col col-4 flex justify-end clearfix ${
            styles['right-side']
          }`}
        >
          <NavLink exact to="/profile" className="flex mr4 link-text">
            Profile
          </NavLink>
          <NavLink exact to="/collections" className="flex mr4 link-text">
            Collections
          </NavLink>
          <NavLink exact to="/products" className="flex mr4 link-text">
            <button className="button">Shop Online</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Nav;
