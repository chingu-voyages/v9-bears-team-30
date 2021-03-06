import React, { useState } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/getSigninAction"

import "./sideDrawer.css"

const SideDrawer = (props) => {
    let auth = useSelector(state => state.getSignin.isAuthenticated);
    let dispatch = useDispatch();
    const [drawerClass, setDrawerClass] = useState(props.drawer)
    
    const closeClickHandler = (e) => {
      e.preventDefault()
      setDrawerClass("side-drawer close")
      setTimeout(() => {
        props.click()
      }, 520)
    }

    return (
      <nav className={drawerClass}>
          <h1>Climate Spy</h1>
          <ul>
          {auth &&
            <li className="drawer-links">
              <Link
                to="/dashboard"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text">Dashboard</span>
              </Link>
            </li>
          }
          {!auth &&
            <li className="drawer-links">
              <Link
                to="/signup"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text">Sign Up</span>
              </Link>
            </li>
          }
          {!auth &&
            <li className="drawer-links">
              <Link
                to="/signin"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text">Sign In</span>
              </Link>
            </li>
          } 
            <li className="drawer-links">
              <Link
                to="/search"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text">US Temperature Data</span>
              </Link>
            </li>
            <li className="drawer-links">
              <Link
                to="/precipitation"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text">US Rainfall Data</span>
              </Link>
            </li>
          {auth &&
            <li className="drawer-links">
              <Link
                to="/dashboard"
                style={{ color: `black`, textDecoration: `none` }}
              >
                <span className="link-text" onClick={() => dispatch(logoutUser())}>Sign Out</span>
              </Link>
            </li>
          }
            <li>
              <button className="close-button" onClick={closeClickHandler}>
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
