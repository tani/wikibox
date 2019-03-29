import React from "react";
import { Container } from "react-bootstrap";
import { Redirect, Route } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";

const App = (): ReturnType<React.FC> => (
  <React.Fragment>
    <Header />
    <Router>
      <Container style={{ marginTop: 20 }}>
        <Route
          exact={true}
          path="/"
          component={() => <Redirect to="/index.md/" />}
        />
        <Route path="/:filename/" component={Page} />
      </Container>
    </Router>
    <Footer />
  </React.Fragment>
);

export default App;
