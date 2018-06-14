import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <div className="my3 px4 flex items-center clearfix">
        <div className={`col col-4 flex justify-start ${styles['left-side']}`}>
          <NavLink exact to="/location" className="ml4 link-text">
            Location
          </NavLink>
          <NavLink exact to="/contact" className="ml4 link-text">
            Contact
          </NavLink>
        </div>
        <div className="col col-4 flex justify-center items-center">
          <NavLink exact to="/" className="justify-center">
            <Image
              alt="Click the Ample Hills Logo to return to the homepage"
              src="/assets/images/ample-hills-logo.svg"
            />
          </NavLink>
        </div>
        <div
          className={`col col-4 flex items-center justify-end clearfix ${
            styles['right-side']
          }`}
        >
          <NavLink exact to="/profile" className="mr4 link-text">
            Profile
          </NavLink>
          <NavLink exact to="/collections" className="mr4 link-text">
            Collections
          </NavLink>
          <Button
            to="/products"
            variant="secondary"
            color="peach"
            label="Shop Online"
          />
        </div>
      </div>
    );
  }
}

export default Nav;
