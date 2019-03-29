import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import ReactHighlight from "react-highlight";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import Scroll from "react-scroll";
import slugify from "slugify";
import markdown from "./markdown";
import RemarkMath from "remark-math";
import KaTeX from "react-katex";

const tocListStyle = {
  borderLeft: "solid 1px rgba(32,32,32,0.2)",
  listStyle: "none",
  paddingBottom: 5,
  paddingLeft: 20,
  paddingTop: 5,
  position: "sticky" as "sticky",
  top: 20
};
const TableOfContents = (props: {
  source: string;
  filename: string;
}): ReturnType<React.FC> => {
  const [state, dispatch] = React.useState({
    toc: [{ hlevel: 0, href: "", text: "" }]
  });
  React.useEffect(() => {
    (async () => {
      const div = document.createElement("div");
      div.innerHTML = await markdown(props.source);
      dispatch({
        toc: Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(h => ({
          hlevel: parseInt(h.tagName.replace(/[a-zA-Z]/, ""), 10),
          href: slugify(h.innerHTML),
          text: h.innerHTML
        }))
      });
    })();
  }, [props.filename, props.source]);
  return (
    <ul style={tocListStyle} className="d-none d-md-block">
      {state.toc.map(item => (
        <li style={{ paddingLeft: `${item.hlevel - 1}em` }} key={item.text}>
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
};
const renderers = {
  code(p: { value: string; language: string }) {
    return (
      <ReactHighlight className={`language-${p.language}`}>
        {p.value}
      </ReactHighlight>
    );
  },
  heading(p: { level: number; children: Element[] }) {
    return (
      <div className={`h${p.level}`}>
        <Scroll.Element name={slugify(p.children.toString())}>
          {p.children}
        </Scroll.Element>
      </div>
    );
  },
  inlineMath(p: { value: string }) {
    return <KaTeX.InlineMath math={p.value} />;
  },
  math(p: { value: string }) {
    return <KaTeX.BlockMath math={p.value} />;
  },
  table(p: { children: Element[] }) {
    return <Table>{p.children}</Table>;
  }
};
const Page = (
  props: RouteComponentProps<{ filename: string }>
): ReturnType<React.FC> => {
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
        <TableOfContents
          source={state.source}
          filename={props.match.params.filename}
        />
      </Col>
    </Row>
  );
};

export default Page;
