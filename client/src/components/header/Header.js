import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton"
import "./header.css"
import { logoutUser } from '../../actions/getSigninAction';

const Header = (props) => {

  //Allows you to extract data from the Redux store state, using a selector function.
  //See more: https://react-redux.js.org/next/api/hooks#useselector-examples
  var auth = useSelector(state => state.getSignin.isAuthenticated);
  console.log('auth is: ' + JSON.stringify(auth));

  //This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
  //See more: https://react-redux.js.org/next/api/hooks#usedispatch
  var dispatch = useDispatch();

    return (
      <div className="header">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <nav>
          <div className="logo">
            <NavLink to="/" className="title">Climate Spy</NavLink>
          </div>
          <div className="data-links">
            <div>
              <NavLink to="/search" className="nav-link"><span className="link-text">US Temperature Data</span></NavLink>
            </div>
            <div>
              <NavLink to="/precipitation" className="nav-link"><span className="link-text">US Rainfall Data</span></NavLink>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="nav-right">
            <ul className="links">
            { !auth &&
              <li className="nav-link">
                <NavLink
                  to="/signup"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Sign Up</span>
                </NavLink>
              </li>
            }
            { !auth &&
              <li className="nav-link">
                <NavLink
                  to="/signin"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Sign In</span>
                </NavLink>
              </li>
            }            
            { auth &&
              <li className="nav-link">
                <NavLink
                  to="/dashboard"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Dashboard</span>
                </NavLink>
              </li>
            }
            { auth &&
              <li className="nav-link">
                <NavLink
                  to="/dashboard"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text" onClick={() => dispatch(logoutUser())}>Sign Out</span>
                </NavLink>
              </li>
            }
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default Header
