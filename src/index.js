import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Home from "./layouts/Home.js";
import Register from './layouts/Register.js';
import Login from './layouts/Login.js';

import "./assets/css/material-dashboard-react.css?v=1.9.0";
import ProtectedRoute from "./routes/ProtectedRoute";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/home" component={Home} />
        <Redirect from="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
