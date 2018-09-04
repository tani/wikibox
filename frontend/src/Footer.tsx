import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");
require("katex/dist/katex.css");

interface FooterProps {}
interface FooterState {
  source: string;
}
export default class Footer extends Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      source: ""
    };
  }
  componentDidMount() {
    (async () => {
      const response = await fetch("footer.md");
      const source = await response.text();
      this.setState({ source });
    })();
  }
  render() {
    return (
      <ReactMarkdown
        source={this.state.source}
        plugins={[RemarkMath]}
        renderers={{
          math: p => <BlockMath math={p.value} />,
          inlineMath: p => <InlineMath math={p.value} />
        }}
      />
    );
  }
}
