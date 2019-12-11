import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Redirect, Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";

const App = () => (
  <React.Fragment>
    <Header />
    <Container style={{ marginTop: 20 }}>
      <Router>
        <Switch>
          <Route
            exact path="/" component={() => <Redirect to="/main.html" />}
          />
          <Route path="/:filename(.+)" component={Page} />
        </Switch>
      </Router>
    </Container>
    <Footer />
  </React.Fragment>
);

export default App;
