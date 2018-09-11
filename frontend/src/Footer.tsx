import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface FooterState {
  source: string;
}
export default class Footer extends Component<{}, FooterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      source: "",
    };
  }
  public componentDidMount() {
    (async () => {
      const response = await fetch("footer.md");
      const source = await response.text();
      this.setState({ source });
    })();
  }
  public render() {
    const renderers = {
      inlineMath: (p: { value: any }) => <InlineMath math={p.value} />,
      math: (p: { value: any }) => <BlockMath math={p.value} />,
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
