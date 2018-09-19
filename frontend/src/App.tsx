import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { Container } from "reactstrap";
import Api from "./api";
import { Provider } from "./Context";
import Edit from "./Edit";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import PrivateRoute from "./PrivateRoute";
const { LastLocationProvider } = require("react-router-last-location");

interface AppState {
  token?: string;
}
export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: undefined
    };
    this.login = this.login.bind(this);
  }
  public async login(username: string, password: string) {
    const api = new Api();
    const response = await api.postToken(username, password);
    if (response) {
      this.setState({ token: response });
    } else {
      this.setState({ token: undefined });
    }
  }
  public render() {
    const DefaultPage = () => (<Redirect to="/page/index.md/"/>);
    return (
      <Router>
        <Provider
          value={{ token: this.state.token, getToken: this.login }}
        >
          <LastLocationProvider>
            <Header />
            <Container style={{ marginTop: 20 }}>
              <Route exact={true} path="/" component={DefaultPage}/>
              <Route exact={true} path="/page/" component={DefaultPage}/>
              <Route path="/page/:filename/" component={Page} />
              <PrivateRoute exact={true} path="/edit/" component={Edit}/>
              <Footer />
            </Container>
          </LastLocationProvider>
        </Provider>
      </Router>
    );
  }
}
