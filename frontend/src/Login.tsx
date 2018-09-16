import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, Component } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
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
      username: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  public handleSubmitClick(
    login: (username: string, password: string) => Promise<void>
  ) {
    return async () => {
      login(this.state.username, this.state.password);
      return false;
    };
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
    const $Login = ({ token, login }: any) => {
      return token ? (
        <Redirect to={this.props.location.state.from} />
      ) : (
        <Input type="button" value="Login" onClick={this.handleSubmitClick(login)} />
      );
    };
    return (
      <Form>
        <h1>Login</h1>
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
            {context => (
              <$Login
                token={context.token}
                login={context.login}
              />
            )}
          </Consumer>
        </FormGroup>
      </Form>
    );
  }
}
