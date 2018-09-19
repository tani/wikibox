import React, { Component, ComponentType } from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router";
import { Consumer } from "./Context";
import Login from "./Login";
interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
export default class PrivateRoute extends Component<PrivateRouteProps, {}> {
  public render() {
    const { component: PrivateComponent, ...rest } = this.props;
    const $render = (props: any) => (
      <Consumer>
        {({ token }) =>
          token ? <PrivateComponent {...props} /> : <Login />
        }
      </Consumer>
    );
    return <Route {...rest} render={$render} />;
  }
}
