import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Api from "./api";
import { Provider } from "./Context";
import Edit from "./Edit";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Page from "./Page";
import PrivateRoute from "./PrivateRoute";

interface AppState {
  sessionToken?: string;
}
export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: undefined,
    };
  }
  public render() {
    const login = async (username: string, password: string) => {
      const api = new Api(location.href);
      const response = await api.auth(username, password);
      if (response) {
        this.setState({ sessionToken: response.sessionToken });
      } else {
        this.setState({ sessionToken: undefined });
      }
    };
    return (
      <Router>
        <Provider value={{ sessionToken: this.state.sessionToken, login }}>
          <Header />
          <Container style={{ marginTop: 20 }}>
            <Route path="/page/:filename" component={Page} />
            <PrivateRoute path="/edit/:filename" component={Edit} />
            <Route path="/login" component={Login} />
            <Footer />
          </Container>
        </Provider>
      </Router>
    );
  }
}
