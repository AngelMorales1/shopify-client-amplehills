import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="p1 mb3">
        <span>Ample Hills</span>
        <ul>
          <li className="inline mr1">
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li className="inline mx1">
            <NavLink exact to="/collections">
              Collections
            </NavLink>
          </li>
          <li className="inline mx1">
            <NavLink exact to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
