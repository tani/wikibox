import React, { Component, ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { Consumer } from "./Context";

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default class PrivateRoute extends Component<PrivateRouteProps, {}> {
  public render() {
    const { component: PrivateComponent, ...rest } = this.props;
    const destination = (from: string) => ({
      pathname: "/login",
      state: { from }
    });
    const $PrivateRoute = ({ token, ...props }: any) =>
      token ? (
        <PrivateComponent {...props} />
      ) : (
        <Redirect to={destination(props.location)} />
      );
    const render = (props: any) => (
      <Consumer>
        {context => (
          <$PrivateRoute token={context.token} {...props} />
        )}
      </Consumer>
    );
    return <Route {...rest} render={render} />;
  }
}
