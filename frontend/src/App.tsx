import React, { Component } from "react";
import { Container } from "reactstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Page from "./Page";
import Edit from "./Edit";
import Footer from "./Footer";
import { Provider } from "./Context";
import Api from "./api";
import Secret from "./Secret";

interface AppProps {}
interface AppState {
  api: Api;
}
export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      api: new Api()
    };
    this.login = this.login.bind(this);
  }
  async login(username: string, password: string) {
    if(process.env.NODE_ENV==="production") {
      await this.state.api.auth(username, password);
    } else {
      this.state.api.sessionToken = "development";
    }
    this.setState({ api: this.state.api });
  }
  render() {
    const SecretEdit = (props: any) => (
      <Secret>
        <Edit {...props} />
      </Secret>
    );
    return (
      <Router>
        <Provider value={{ api: this.state.api, login: this.login }}>
          <Header />
          <Container style={{ marginTop: 20 }}>
            <Route exact path="/page/:filename" component={Page} />
            <Route path="/edit/:filename" component={SecretEdit} />
            <Footer />
          </Container>
        </Provider>
      </Router>
    );
  }
}
