import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./home";
import User from "./Users";
import SignUpPage from "./SignUpPage"

export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={User} />
      <Route path="/signup" component={SignUpPage} />
    </BrowserRouter>
  );
};
