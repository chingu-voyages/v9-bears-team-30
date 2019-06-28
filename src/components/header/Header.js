import React from "react"
import { NavLink } from "react-router-dom"

import DrawerToggleButton from "../sidedrawer/DrawerToggleButton"
import "./header.css"

const Header = (props) => {
    return (
      <div className="header">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <nav>
          <div className="logo">
            <NavLink to="/" className="title">Climate Spy</NavLink>
          </div>
          <div className="spacer"></div>
          <div className="nav-right">
            <ul className="links">
              <li className="nav-link">
                <NavLink
                  to="/signup"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Sign Up</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/signin"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Sign In</span>
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/users"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Users</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Header
