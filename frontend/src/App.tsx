import React, { Component } from "react";
import { Container } from "reactstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Page from "./Page";
import Edit from "./Edit";
import Footer from "./Footer";
import { Provider } from "./Context";
import Api from "./api";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";

interface AppProps {}
interface AppState {
  sessionToken?: string
}
export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: undefined
    };
  }
  render() {
    const login = async (username: string, password: string) => {
      const api = new Api(location.href);
      const response = await api.auth(username, password);
      if(response) {
        this.setState({ sessionToken: response.sessionToken });
      } else {
        this.setState({ sessionToken: undefined })
      }
    }
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
