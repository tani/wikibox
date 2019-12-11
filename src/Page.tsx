import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { RouteComponentProps } from "react-router";
import slugify from "slugify";
import { HashLink } from "react-router-hash-link";

const tocListStyle = {
  borderLeft: "solid 1px rgba(32,32,32,0.2)",
  listStyle: "none",
  paddingBottom: 5,
  paddingLeft: 20,
  paddingTop: 5,
  position: "sticky" as "sticky",
  top: 20
};
const TableOfContents = (props: { source: string; filename: string }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(props.source, "text/html")
  const toc = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"))
    .map(element => ({
      hlevel: parseInt(element.tagName.replace(/[a-zA-Z]/, ""), 10),
      text: element.innerHTML
    }));
  return (
    <ul style={tocListStyle} className="d-none d-md-block">
      {toc.map(item => (
        <li style={{ paddingLeft: `${item.hlevel - 1}em` }} key={item.text}>
          <HashLink to={`/${props.filename}#${slugify(item.text)}`}>
            {item.text}
          </HashLink>
        </li>
      ))}
    </ul>
  );
};

const Page = (props: RouteComponentProps<{ filename: string }>) => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const parser = new DOMParser();
      const response = await fetch(`./${props.match.params.filename}`);
      if (response.status === 200) {
        const source = await response.text();
        const doc = parser.parseFromString(source, "text/html");
        doc.querySelectorAll("h1,h2,h3,h4,h5").forEach((element) => {
          element.setAttribute("id", slugify(element.innerHTML));
        });
        dispatch({ source });
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
