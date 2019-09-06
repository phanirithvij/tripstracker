// Imports
import React from "react";
import ReactDOM from "react-dom";

import "./stylesheets/index.css";
import { App } from "./components/App";

import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter basename={'/tripstracker/'}>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

// ReactDOM.render(<App/>,document.getElementById('root'));
