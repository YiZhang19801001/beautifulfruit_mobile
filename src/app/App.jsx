import React from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";

import { initialApp } from "../_actions";
import { Products } from "./Products";
import { Confirm } from "./Confirm";
import { Account } from "./Account";
import { Complete } from "./Complete";
import { history } from "../history";
import { Cancel } from "./Cancel";
import { PrivateRoute } from "../PrivateRoute";

import { Login, Register } from "./Auth";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.initialApp();
  }
  render() {
    return (
      <div className="component-app">
        <Router history={history}>
          <React.Fragment>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/products`}
              component={Products}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/confirm`}
              component={Confirm}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/account`}
              component={Account}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={Register}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/cancel/:channel`}
              component={Cancel}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/complete/:channel`}
              component={Complete}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Products}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  { initialApp }
)(App);
