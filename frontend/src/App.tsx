import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { Container } from "reactstrap";
import Edit from "./Edit";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import PrivateRoute from "./PrivateRoute";
const { LastLocationProvider } = require("react-router-last-location");

export default class App extends Component<{}, {}> {
  public render() {
    const DefaultPage = () => <Redirect to="/page/index.md/" />;
    return (
      <div>
        <Header />
        <Container style={{ marginTop: 20 }}>
          <Router>
            <LastLocationProvider>
              <Route exact={true} path="/" component={DefaultPage} />
              <Route exact={true} path="/page/" component={DefaultPage} />
              <Route path="/page/:filename/" component={Page} />
              <PrivateRoute exact={true} path="/edit/" component={Edit} />
            </LastLocationProvider>
          </Router>
          <Footer />
        </Container>
      </div>
    );
  }
}
