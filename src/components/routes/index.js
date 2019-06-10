import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./home";
import User from "./Users"

export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={User} />
    </BrowserRouter>
  );
};
