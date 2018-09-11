import React, { Component, ComponentType } from "react";
import { Consumer } from "./Context";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

interface PrivateRouteState {}

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default class PrivateRoute extends Component<
  PrivateRouteProps,
  PrivateRouteState
> {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
          <Consumer>
            {context =>
              context.sessionToken ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
            }
          </Consumer>
        )}
      />
    );
  }
}
