import React, { Component, ComponentType } from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router";
import Login from "./Login";
interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
interface PrivateRouteState {
  token: string | null;
}
export default class PrivateRoute extends Component<PrivateRouteProps, PrivateRouteState> {
  constructor(props: PrivateRouteProps) {
    super(props);
    this.state = {
      token: null
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  public handleLogin(token: string | null) {
    this.setState({ token });
  }
  public render() {
    const { component: PrivateComponent, ...rest } = this.props;
    const $render = (props: any) => (
      this.state.token ? <PrivateComponent {...props} {...this.state}  /> : <Login onLogin={this.handleLogin} />
    );
    return <Route {...rest} render={$render} />;
  }
}
