import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import { Element, Link } from "react-scroll";
import { Row, Table } from "reactstrap";
import Col from "reactstrap/lib/Col";
import slugify from "slugify";
import Api from "./api";
import markdown from "./markdown";
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface PageProps extends RouteComponentProps<{ filename: string }> {}
interface PageState {
  filename: string;
  source: string;
  toc: Array<{ href: string; text: string; hlevel: number }>;
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
  public async updateSource() {
    const api = new Api();
    const response = await api.getData(this.state.filename);
    const div = document.createElement("div");
    div.innerHTML = await markdown(response || "");
    const toc = Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
      h => ({
        hlevel: parseInt(h.tagName.replace(/[a-zA-Z]/, ""), 10),
        href: slugify(h.innerHTML),
        text: h.innerHTML
      })
    );
    this.setState({
      source: response || "",
      toc
    });
  }
  public componentDidMount() {
    const filename = this.props.match.params.filename;
    this.setState({ filename });
    this.updateSource();
  }
  public componentWillReceiveProps() {
    const filename = this.props.match.params.filename;
    this.setState({ filename });
    this.updateSource();
  }
  public render() {
    const tocListStyle = {
      borderLeft: "solid 1px rgba(32,32,32,0.2)",
      listStyle: "none",
      paddingBottom: 5,
      paddingLeft: 20,
      paddingTop: 5,
      position: "sticky" as "sticky",
      top: 20
    };
    const tocItemStyle = (hlevel: number) => ({
      paddingLeft: `${hlevel - 1}em`
    });
    const tocItems = this.state.toc.map(item => (
      <li style={tocItemStyle(item.hlevel)} key={item.text}>
        <Link
          to={slugify(item.text.toString())}
          href={`#/page/${this.state.filename}`}
        >
          {item.text}
        </Link>
      </li>
    ));
    const renderers = {
      heading(p: any) {
        const Hn = `h${p.level}`;
        return (
          <Hn>
            <Element name={slugify(p.children.toString())}>
              {p.children}
            </Element>
          </Hn>
        );
      },
      table(p: any) {
        return <Table>{p.children}</Table>;
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
            plugins={[RemarkMath]}
            renderers={renderers}
          />
        </Col>
        <Col md="3">
          <ul style={tocListStyle} className="d-none d-md-block">
            {tocItems}
          </ul>
        </Col>
      </Row>
    );
  }
}
