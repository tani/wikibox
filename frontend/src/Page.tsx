import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";
import { Link } from "react-router-dom";
import markdown from "./markdown";
const RemarkHighlightJs = require("remark-highlight.js");
const RemarkSlug = require("remark-slug");
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface PageProps extends RouteComponentProps<{ filename: string }> {}
interface PageState {
  source: string;
  toc: { href: string; text: string; hlevel: number }[];
}
export default class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      source: "",
      toc: []
    };
  }
  async updateSource() {
    const response = await fetch(this.props.match.params.filename);
    const source = await response.text();
    const div = document.createElement("div");
    div.innerHTML = await markdown(source);
    const toc = Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
      h => ({
        href: h.id,
        text: h.innerHTML,
        hlevel: parseInt(h.tagName.replace(/[a-zA-Z]/, ""))
      })
    );
    this.setState({
      source,
      toc
    });
  }
  componentDidMount() {
    this.updateSource();
  }
  componentWillReceiveProps() {
    this.updateSource();
  }
  render() {
    return (
      <Row>
        <Col>
          <ReactMarkdown
            source={this.state.source}
            plugins={[RemarkMath, RemarkSlug, RemarkHighlightJs]}
            renderers={{
              math: p => <BlockMath math={p.value} />,
              inlineMath: p => <InlineMath math={p.value} />
            }}
          />
        </Col>
        <Col>
          <ul>
            {this.state.toc.map(item => (
              <li style={{ paddingLeft: `${item.hlevel - 1}em` }} key={item.text}>
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    );
  }
}
