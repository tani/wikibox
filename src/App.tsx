import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";

const App = () => (
  <React.Fragment>
    <Header filename="page/header.html" />
    <div className="container" style={{ marginTop: 20 }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="page/index.md" />}
          />
          <Route path="/:filename(.+)" component={Page} />
        </Switch>
      </Router>
    </div>
    <Footer filename="page/footer.html" />
  </React.Fragment>
);

export default App;
