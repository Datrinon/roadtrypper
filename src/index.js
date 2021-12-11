import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import "./index.css";
import "./css/App.css";


import Router from "./js/components/Router";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
