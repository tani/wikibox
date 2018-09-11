import React, { Component, ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { Consumer } from "./Context";

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default class PrivateRoute extends Component<PrivateRouteProps, {}> {
  public render() {
    const { component: PrivateComponent, ...rest } = this.props;
    const render = (props: any) => (
      <Consumer>
        {(context) =>
          context.sessionToken ? (
            <PrivateComponent {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      </Consumer>
    );
    return <Route {...rest} render={render} />;
  }
}
