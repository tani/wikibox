import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import Api from "./api";
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface FooterState {
  source: string;
}
export default class Footer extends Component<{}, FooterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      source: ""
    };
  }
  public componentDidMount() {
    (async () => {
      const api = new Api();
      const response = await api.getData("footer.md");
      this.setState({ source: response || "" });
    })();
  }
  public render() {
    const renderers = {
      inlineMath(p: { value: any }) {
        return <InlineMath math={p.value} />;
      },
      math(p: { value: any }) {
        return <BlockMath math={p.value} />;
      }
    };
    return (
      <ReactMarkdown
        source={this.state.source}
        plugins={[RemarkMath]}
        renderers={renderers}
      />
    );
  }
}
