import React, { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Consumer } from "./Context";
import Api from "./api";
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
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(api: Api) {
    return async () => {
      await api.edit(
        this.state.filename,
        new Blob([this.state.source], { type: "text/plain" })
      );
      this.props.history.push(`/page/${this.state.filename}`);
    };
  }
  async handlePropsChange() {
    const response = await fetch(`./${this.props.match.params.filename}`);
    const source = await response.text();
    this.setState({
      source
    });
  }
  handleFilenameChange(event: ChangeEvent<HTMLInputElement>) {
    const filename = event.target.value;
    this.setState({
      filename
    });
  }
  handleSourceChange(event: ChangeEvent<HTMLInputElement>) {
    const source = event.target.value;
    this.setState({
      source
    });
  }
  componentDidMount() {
    this.handlePropsChange();
  }
  componentWillReceiveProps() {
    this.handlePropsChange();
  }
  render() {
    return (
      <Consumer>
        {context => (
          <Form onSubmit={this.handleSubmit(context.api)}>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faFile} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input value={this.state.filename} onChange={this.handleFilenameChange} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                onChange={this.handleSourceChange}
                value={this.state.source}
                rows={20}
              />
            </FormGroup>
            <FormGroup>
              <Input type="submit" />
            </FormGroup>
          </Form>
        )}
      </Consumer>
    );
  }
}
