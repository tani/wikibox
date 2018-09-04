import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";
import { Link, Element } from "react-scroll";
import markdown from "./markdown";
import slugify from "slugify";
const RemarkHighlightJs = require("remark-highlight.js");
const RemarkSlug = require("remark-slug");
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface PageProps extends RouteComponentProps<{ filename: string }> {}
interface PageState {
  filename: string;
  source: string;
  toc: { href: string; text: string; hlevel: number }[];
}
export default class Page extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      filename: props.match.params.filename,
      source: "",
      toc: []
    };
  }
  async updateSource() {
    const response = await fetch(this.state.filename);
    const source = await response.text();
    const div = document.createElement("div");
    div.innerHTML = await markdown(source);
    const toc = Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
      h => ({
        href: slugify(h.innerHTML),
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
    const filename = this.props.match.params.filename;
    this.setState({ filename });
    this.updateSource();
  }
  componentWillReceiveProps() {
    const filename = this.props.match.params.filename;
    this.setState({ filename });
    this.updateSource();
  }
  render() {
    const renderers = {
      headings(p: any) {
        const Hn = `h${p.level}`;
        return (
          <Hn>
            <Element name={slugify(p.children.toString())}>
              {p.children}
            </Element>
          </Hn>
        );
      },
      math(p: any) {
        return <BlockMath math={p.value} />;
      },
      inlineMath(p: any) {
        return <InlineMath math={p.value} />;
      }
    };
    return (
      <Row>
        <Col md="9">
          <ReactMarkdown
            source={this.state.source}
            plugins={[RemarkMath, RemarkSlug, RemarkHighlightJs]}
            renderers={renderers}
          />
        </Col>
        <Col md="3">
          <ul
            style={{
              borderLeft: "solid 1px rgba(32,32,32,0.2)",
              position: "sticky",
              top: 20,
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
              listStyle: "none"
            }}
            className="d-none d-md-block"
          >
            {this.state.toc.map(item => (
              <li
                style={{ paddingLeft: `${item.hlevel - 1}em` }}
                key={item.text}
              >
                <Link
                  to={slugify(item.text.toString())}
                  href={`#/page/${this.state.filename}`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          {/*
            <div style={{paddingLeft: 20}}>
            [ <Link to={`/edit/${this.state.filename}`}>Edit</Link> 
            / <Link to={`/create`}>Create</Link>
            / <Link to={`/delete/${this.state.filename}`}>Delete</Link>
            / <Link to={`/history/${this.state.filename}`}>History</Link> ]
            </div>
            */}
        </Col>
      </Row>
    );
  }
}
