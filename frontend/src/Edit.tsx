import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Api from "./api";
import { Consumer } from "./Context";
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
      password: "",
      source: "",
      username: "",
    };
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleSubmit(sessionToken?: string) {
    return async () => {
      await new Api(location.href, sessionToken).edit(
        this.state.filename,
        new Blob([this.state.source], { type: "text/plain" }),
      );
      this.props.history.push(`/page/${this.state.filename}`);
    };
  }
  public async handlePropsChange() {
    const response = await fetch(`./${this.props.match.params.filename}`);
    const source = await response.text();
    this.setState({
      source,
    });
  }
  public handleFilenameChange(event: ChangeEvent<HTMLInputElement>) {
    const filename = event.target.value;
    this.setState({
      filename,
    });
  }
  public handleSourceChange(event: ChangeEvent<HTMLInputElement>) {
    const source = event.target.value;
    this.setState({
      source,
    });
  }
  public componentDidMount() {
    this.handlePropsChange();
  }
  public componentWillReceiveProps() {
    this.handlePropsChange();
  }
  public render() {
    return (
      <Consumer>
        {({ sessionToken }: { sessionToken?: string }) => (
          <Form onSubmit={this.handleSubmit(sessionToken)}>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <FontAwesomeIcon icon={faFile} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={this.state.filename}
                  onChange={this.handleFilenameChange}
                />
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
