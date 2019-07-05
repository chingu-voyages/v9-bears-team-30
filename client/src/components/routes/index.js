import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { getSigninSucess, logoutUser } from "../../actions/getSigninAction";

import { store } from "../../store";

import Home from "./Home";
import User from "./Users";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import CityData from "./search/CityData"
import CityRainData from "./search/CityRainData"
import PrivateRoute from "../PrivateRoute";
import Dashboard from "./Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(getSigninSucess(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to signin
    window.location.href = "/SignInPage";
  }
}

export default () => {
  return (
	<BrowserRouter>
		<Route exact path="/" component={Home} />
		<Route path="/users" component={User} />
		<Route path="/signup" component={SignUpPage} />
		<Route path="/signin" component={SignInPage} />
		<Route path="/search" component={CityData} />
		<Route path="/precipitation" component={CityRainData} />
		<Switch>
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
		</Switch>
    </BrowserRouter>
  );
};
