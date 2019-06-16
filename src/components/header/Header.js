import React from "react"
import { NavLink } from "react-router-dom"

import DrawerToggleButton from "../sidedrawer/DrawerToggleButton"
import "./header.css"

const Header = () => {
    return (
      <div className="header">
        <div>
          <DrawerToggleButton />
        </div>
        <h1 className="title">Climate Spy</h1>
        <div className="nav-right">
          <ul>
            <li>
              <NavLink
                to="/signup"
                style={{ color: `white`, textDecoration: `none` }}
              >
                <span className="link-text">Sign Up</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                style={{ color: `white`, textDecoration: `none` }}
              >
                <span className="link-text">Users</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
}

export default Header
