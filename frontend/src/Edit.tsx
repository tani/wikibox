import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fromNullable } from "fp-ts/lib/Option";
import React, { ChangeEvent, Component } from "react";
import { RouteComponentProps } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Api from "./api";
import { Consumer } from "./Context";
const { withLastLocation } = require("react-router-last-location");
interface EditProps extends RouteComponentProps<{}> {
  lastLocation: Location | null;
}
interface EditState {
  filename: string;
  source: string;
  username: string;
  password: string;
}

class Edit extends Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    const filename = fromNullable(this.props.lastLocation)
      .map($lastLocation => $lastLocation.pathname.replace(/^.*\/([^\/]+)\/?$/, "$1"))
      .getOrElse("index.md");
    this.state = {
      filename,
      password: "",
      source: "",
      username: ""
    };
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }
  public handleSubmit() {
    return false;
  }
  public handleFilenameChange(event: ChangeEvent<HTMLInputElement>) {
    const filename = event.target.value;
    this.setState({
      filename
    });
  }
  public handleSourceChange(event: ChangeEvent<HTMLInputElement>) {
    const source = event.target.value;
    this.setState({
      source
    });
  }
  public async componentDidMount() {
    const api = new Api();
    const response = await api.getData(this.state.filename);
    this.setState({ source: response || "" });
  }
  public render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
          <Consumer>
            {({ token }: any) => {
              const onClick = async () => {
                await new Api(token).postData(
                  this.state.filename,
                  this.state.source
                );
                this.props.history.push(`/page/${this.state.filename}`);
              };
              return <Input type="button" value="Upload" {...{ onClick }} />;
            }}
          </Consumer>
        </FormGroup>
      </Form>
    );
  }
}
export default withLastLocation(Edit);
