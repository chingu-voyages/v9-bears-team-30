import React from "react";
import "./App.css";
import Routes from "./components/routes/index";
import { connect } from 'react-redux';

const App = () => {
  return (
    <Routes />
  )
}

export default connect(null, null)(App);
