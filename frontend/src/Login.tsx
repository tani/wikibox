import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { Consumer } from "./Context";

interface LoginState {
  username: string;
  password: string;
}

export default class Login extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      password: "",
      username: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  public handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const username = event.target.value;
    this.setState({
      username
    });
  }
  public handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    this.setState({
      password
    });
  }
  public render() {
    return (
      <Form>
        <h1>Authentication Required</h1>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faUser} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              value={this.state.username}
              placeholder="username"
              onChange={this.handleUsernameChange}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faKey} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              value={this.state.password}
              placeholder="password"
              type="password"
              onChange={this.handlePasswordChange}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Consumer>
            {({getToken}) => {
              const onClick=()=>getToken(this.state.username, this.state.password);
              return <Input type="button" value="Login" { ...{ onClick }} />
            }}
          </Consumer>
        </FormGroup>
      </Form>
    );
  }
}
