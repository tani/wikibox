import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Consumer } from "./Context";

interface LoginProps extends RouteComponentProps<{}> {}

interface LoginState {
  username: string;
  password: string;
}

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      password: "",
      username: "",
    };
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  public handleSumbit(
    login: (username: string, password: string) => Promise<void>,
  ) {
    return async () => {
      login(this.state.username, this.state.password);
      return false;
    };
  }
  public render() {
    return (
      <Consumer>
        {(context) =>
          context.sessionToken ? (
            <Redirect to={this.props.location.state.from} />
          ) : (
            <Form onSubmit={this.handleSumbit(context.login)}>
              <h1>Login</h1>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="username" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faKey} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="username" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Input type="submit" />
              </FormGroup>
            </Form>
          )
        }
      </Consumer>
    );
  }
}
