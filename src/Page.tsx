import React from "react";
import ReactHighlight from "react-highlight";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import Scroll from "react-scroll";
import { Row, Table } from "reactstrap";
import Col from "reactstrap/lib/Col";
import slugify from "slugify";
import markdown from "./markdown";
const RemarkMath = require("remark-math");
const KaTeX = require("react-katex");

const tocListStyle = {
  borderLeft: "solid 1px rgba(32,32,32,0.2)",
  listStyle: "none",
  paddingBottom: 5,
  paddingLeft: 20,
  paddingTop: 5,
  position: "sticky" as "sticky",
  top: 20
};
const TableOfContent = (props: { source: string, filename: string }) => {
  const [state, dispatch] = React.useState({
    toc: [{hlevel: 0, href: "", text: ""}]
  });
  React.useEffect(()=>{
    (async () => {
      const div = document.createElement("div");
      div.innerHTML = await markdown(props.source);
      dispatch({
        toc: Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
          h => ({
            hlevel: parseInt(h.tagName.replace(/[a-zA-Z]/, ""), 10),
            href: slugify(h.innerHTML),
            text: h.innerHTML
          }))
      });
    })();
  }, [state.toc]);
  return (
    <ul style={tocListStyle} className="d-none d-md-block">
      {state.toc.map(item => (
        <li style={{paddingLeft: `${item.hlevel-1}em`}} key={item.text}>
          <Scroll.Link
            to={slugify(item.text.toString())}
            href={`#/page/${props.filename}`}
          >
            {item.text}
          </Scroll.Link>
        </li>
      ))}
    </ul>
  );
}
const renderers = {
  code: (p: any) => (
      <ReactHighlight className={`language-${p.language}`}>
        {p.value}
      </ReactHighlight>
  ),
  heading: (p: any) => (
      <div className={`h${p.level}`}>
        <Scroll.Element name={slugify(p.children.toString())}>{p.children}</Scroll.Element>
      </div>
    ),
  table: (p: any) => (<Table>{p.children}</Table>),
  math: (p: any) => (<KaTeX.BlockMath math={p.value} />),
  inlineMath: (p: any) => <KaTeX.InlineMath math={p.value} />
};
export default (props: RouteComponentProps<{filename: string}>) => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch(`./${props.match.params.filename}`);
      const source = response.status === 200 ? await response.text() : "";
      dispatch({ source });
    })();
  }, [props.match.params.filename]);
  return (
    <Row>
      <Col md="9">
        <ReactMarkdown
          source={state.source}
          plugins={[RemarkMath]}
          renderers={renderers}
        />
      </Col>
      <Col md="3">
        <TableOfContent source={state.source} filename={props.match.params.filename} />
      </Col>
    </Row>
  );
};
