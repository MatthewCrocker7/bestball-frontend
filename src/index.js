import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Home from "./layouts/Home.js";
import Register from './layouts/Register.js';
import Login from './layouts/Login.js';
import RTL from "./layouts/RTL.js";

import "./assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
