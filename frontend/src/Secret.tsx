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

interface SecretProps {}

interface SecretState {
  username: string;
  password: string;
}

export default class Secret extends Component<SecretProps, SecretState> {
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
          context.api.isAuthorized ? (
            this.props.children
          ) : (
            <Form
              onSubmit={() => {
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
