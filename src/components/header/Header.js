import React from "react"
import { NavLink } from "react-router-dom"
import { connect, useSelector, useDispatch } from 'react-redux';
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton"
import "./header.css"
import { logoutUser } from '../../actions/getSigninAction';

const Header = (props) => {

  //Allows you to extract data from the Redux store state, using a selector function.
  const auth = useSelector(state => state.auth);

  //This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
  const dispatch = useDispatch();

    return (
      <div className="header">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <nav>
          <div className="logo">
            <NavLink to="/" className="title">Climate Spy</NavLink>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Climate Data
            </button>
            <div className="dropdown-content">
              <div>
                <NavLink to="/search" className="nav-link"><span className="link-text">US Climate Data</span></NavLink>
              </div>
              <div>
                <NavLink to="/worldsearch" className="nav-link"><span className="link-text">World Climate Data</span></NavLink>
              </div>
            </div>
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
              { !auth &&
              <li className="nav-link">
                <NavLink
                  to="/dashboard"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Dashboard</span>
                </NavLink>
              </li>
            }
            { !auth &&
              <li className="nav-link">
                <NavLink
                  to="/dashboard"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text" onClick={() => dispatch(logoutUser())}>Sign Out</span>
                </NavLink>
              </li>
              }
              { auth &&
              <li className="nav-link">
                <NavLink
                  to="/signin"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  <span className="link-text">Sign In</span>
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

// //pass store state as props. value must equal a valid store key. 
// const mapStateToProps = ( state ) => {   
//   return { 
//     auth: state.getSignin
//   }
// };

// //passes actions as props. dispatch(callback()) must equal an imported action name
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logoutUser: () => {
//       dispatch(logoutUser())
//     }
//   }
// };

//connects store actions and states to component
// export default connect(mapStateToProps, mapDispatchToProps)(Header);