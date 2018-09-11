import React, { Component } from "react";
import { Consumer } from "./Context";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { RouteComponentProps, Redirect } from "react-router";

interface SecretProps extends RouteComponentProps<{}> {}

interface SecretState {
  username: string;
  password: string;
}

export default class Login extends Component<SecretProps, SecretState> {
  constructor(props: SecretProps) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <Consumer>
        {context =>
          context.sessionToken ? (
            <Redirect to={this.props.location.state.from} />
          ) : (
            <Form
              onSubmit={async () => {
                context.login(this.state.username, this.state.password);
                return false;
              }}
            >
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
