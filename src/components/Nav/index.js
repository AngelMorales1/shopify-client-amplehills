import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/nav.scss";

class Nav extends Component {
  render() {
    return (
      <div>
        <div className="align-center">
          <ul>
            <li className="mr1 text">
              <NavLink exact to="/">
                Ample Hills
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="p1 mb3 order-box">
          <div className="inline align-left">
            <ul>
              <li className="inline text margin-left">
                <NavLink exact to="/Location">
                  Location
                </NavLink>
              </li>
              <li className="inline text margin-left">
                <NavLink exact to="/Contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="inline align-right">
            <ul>
              <li className="inline margin-right text">
                <NavLink exact to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="inline margin-right text">
                <NavLink exact to="/collections">
                  Collections
                </NavLink>
              </li>
              <li className="inline margin-right text text--box hover-reset">
                <NavLink exact to="/products">
                  Shop Online
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
