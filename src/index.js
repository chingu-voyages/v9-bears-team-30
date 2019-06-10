import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from 'react-redux';
import { store } from './components/store';

ReactDOM.render(<App />, document.getElementById("app"))

