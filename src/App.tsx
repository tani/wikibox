import React from "react";
import { Redirect, Route } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { Container } from "reactstrap";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";

export default () => (
  <React.Fragment>
    <Header />
    <Container style={{ marginTop: 20 }}>
      <Router>
        <Route exact={true} path="/" component={() => <Redirect to="/index.md/" />} />
        <Route path="/:filename/" component={Page} />
      </Router>
      <Footer />
    </Container>
  </React.Fragment>
)
