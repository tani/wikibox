import React, { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { faFile, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface EditProps extends RouteComponentProps<{ filename: string }> {}
interface EditState {
  filename: string;
  source: string;
  username: string;
  password: string;
}
export default class Edit extends Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      filename: this.props.match.params.filename,
      source: "",
      username: "",
      password: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handlePropsChange() {
    const response = await fetch(`./${this.props.match.params.filename}`);
    const source = await response.text();
    this.setState({
      source
    });
  }
  handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const username = event.target.value;
    this.setState({
      username
    });
  }
  handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    this.setState({
      password
    });
  }
  handleSourceChange(event: ChangeEvent<HTMLInputElement>) {
    const source = event.target.value;
    this.setState({
      source
    });
  }
  async handleSubmit() {
    await fetch(`./${this.state.filename}`, {
      method: "POST",
      body: JSON.stringify(this.state)
    });
    this.props.history.push(`/page/${this.state.filename}`);
  }
  componentDidMount() {
    this.handlePropsChange();
  }
  componentWillReceiveProps() {
    this.handlePropsChange();
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faFile} />
            </InputGroupAddon>
            <Input value={this.state.filename} disabled/>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            onChange={this.handleSourceChange}
            value={this.state.source}
          />
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faUser} />
            </InputGroupAddon>
            <Input
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <FontAwesomeIcon icon={faKey} />
            </InputGroupAddon>
            <Input
              type="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input type="submit" />
        </FormGroup>
      </Form>
    );
  }
}
