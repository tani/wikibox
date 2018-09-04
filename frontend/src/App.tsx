import React, { Component } from "react";
import { Container } from "reactstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Page from "./Page";
import Edit from "./Edit";
import Create from "./Create";
import Footer from "./Footer";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <header>
            <Header />
          </header>
          <main>
            <Route exact path="/page/:filename" component={Page} />
            <Route path="/edit/:filename" component={Edit} />
            <Route path="/create" component={Create} />
          </main>
          <footer>
            <Footer />
          </footer>
        </Container>
      </Router>
    );
  }
}
