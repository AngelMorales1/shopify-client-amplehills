import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="mx0 my3 nav flex clearfix">
        <div className="col col-4 flex justify-start">
          <div className="flex ml4 nav__text">
            <NavLink exact to="/Location">
              Location
            </NavLink>
          </div>
          <div className="flex ml4 nav__text">
            <NavLink exact to="/Contact">
              Contact
            </NavLink>
          </div>
        </div>
        <div className="col col-4">
          <div className="flex justify-center">
            <NavLink exact to="/">
              <img src="/assets/images/Logo.svg" />
            </NavLink>
          </div>
        </div>
        <div className="col col-4 flex justify-end clearfix">
          <div className="flex mr4 nav__text">
            <NavLink exact to="/profile">
              Profile
            </NavLink>
          </div>
          <div className="flex mr4 nav__text">
            <NavLink exact to="/collections">
              Collections
            </NavLink>
          </div>
          <div className="flex mr4 nav__text">
            <NavLink exact to="/products">
              <button className="button">Shop Online</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
