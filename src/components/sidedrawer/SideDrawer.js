import React from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

import "./sideDrawer.css"

const SideDrawer = (props) => {
    let drawerClasses = "side-drawer"
    if (props.show) {
        drawerClasses = "side-drawer", "open"
    }

    return (
      <nav className="side-drawer">
        <h1>Climate Spy</h1>
        <ul>
          <li className="drawer-links">
            <Link
              to="/signup"
              style={{ color: `black`, textDecoration: `none` }}
            >
              <span className="link-text">Sign Up</span>
            </Link>
          </li>
          <li className="drawer-links">
            <Link
              to="/users"
              style={{ color: `black`, textDecoration: `none` }}
            >
              <span className="link-text">Users</span>
            </Link>
          </li>
          <li>
            <button className="close-button" onClick={props.closeClickHandler}>
              <FontAwesomeIcon
                className="left-arrow-icon"
                icon={faArrowAltCircleLeft}
                size="2x"
                transform="shrink-1"
                color="#fe0c0b"
              /> Close
            </button>
          </li>
        </ul>
      </nav>
    );
}

export default SideDrawer
