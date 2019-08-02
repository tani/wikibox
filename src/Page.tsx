import React from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import slugify from "slugify";
import { load } from "cheerio";
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
  const $ = load(props.source);
  const toc = $("h1,h2,h3,h4,h5,h6")
    .toArray()
    .map(element => ({
      hlevel: parseInt(element.tagName.replace(/[a-zA-Z]/, ""), 10),
      text: $(element).text()
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
      const response = await fetch(`./${props.match.params.filename}`);
      const $ = load(await response.text());
      $("h1,h2,h3,h4,h5").each((_, element) => {
        $(element).attr("id", slugify($(element).text()));
      });
      if (response.status === 200) {
        dispatch({ source: $.html() });
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
