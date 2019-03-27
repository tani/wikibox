import React, { Component, useEffect, useState } from "react";
import ReactHighlight from "react-highlight";
import ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router";
import { Element, Link } from "react-scroll";
import { Row, Table } from "reactstrap";
import Col from "reactstrap/lib/Col";
import slugify from "slugify";
import markdown from "./markdown";
const RemarkMath = require("remark-math");
const { InlineMath, BlockMath } = require("react-katex");

interface Props {
  match: {
    params: {
      filename: string;
    };
  };
}

interface State {
  source: string;
  toc: Array<{
    hlevel: number;
    href: string;
    text: string;
  }>;
}

export default (props: Props) => {
  const [state, dispatch] = useState<State>({
    source: "",
    toc: []
  });
  useEffect(() => {
    (async () => {
      const response = await fetch(`./${props.match.params.filename}`);
      const source = response.status === 200 ? await response.text() : "";
      const div = document.createElement("div");
      div.innerHTML = await markdown(source);
      const toc = Array.from(div.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
        h => ({
          hlevel: parseInt(h.tagName.replace(/[a-zA-Z]/, ""), 10),
          href: slugify(h.innerHTML),
          text: h.innerHTML
        })
      );
      dispatch({ source, toc });
    })();
  }, [props.match.params.filename]);
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
  const renderers = {
    code(p: any) {
      return (
        <ReactHighlight className={`language-${p.language}`}>
          {p.value}
        </ReactHighlight>
      );
    },
    heading(p: any) {
      return (
        <div className={`h${p.level}`}>
          <Element name={slugify(p.children.toString())}>{p.children}</Element>
        </div>
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
          source={state.source}
          plugins={[RemarkMath]}
          renderers={renderers}
        />
      </Col>
      <Col md="3">
        <ul style={tocListStyle} className="d-none d-md-block">
          {state.toc.map(item => (
            <li style={tocItemStyle(item.hlevel)} key={item.text}>
              <Link
                to={slugify(item.text.toString())}
                href={`#/page/${props.match.params.filename}`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};
