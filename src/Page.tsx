import React from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import Scroll from "react-scroll";
import slugify from "slugify";
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
      div.innerHTML = props.source;
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
const Page = (
  props: RouteComponentProps<{ filename: string }>
): ReturnType<React.FC> => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch(`./${props.match.params.filename}`);
      if (response.status === 200) {
        dispatch({ source: await response.text() });
      }
    })();
  }, [props.match.params.filename]);
  return (
    <Row>
      <Col md="9">
        <div dangerouslySetInnerHTML={{ __html: state.source }} />
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
