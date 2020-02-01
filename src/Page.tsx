import React from "react";
import { RouteComponentProps } from "react-router";
import slugify from "slugify";
import { HashLink } from "react-router-hash-link";
import marked from "marked";
import { promisify } from "util";

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
  const doc = parser.parseFromString(props.source, "text/html");
  const toc = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).map(
    element => ({
      hlevel: parseInt(element.tagName.replace(/[a-zA-Z]/, ""), 10),
      text: element.innerHTML
    })
  );
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
      const renderer = new marked.Renderer();
      renderer.code = (code: string, languageAndTheme: string) => {
        const language = languageAndTheme.replace(/\s.*/, "");
        const theme = languageAndTheme.replace(/.*\s/, "");
        const div = document.createElement("div");
        div.setAttribute("is", "source-code");
        div.setAttribute("language", language);
        div.setAttribute("theme", theme);
        div.setAttribute("code", code);
        return div.outerHTML;
      };
      const response = await fetch(`./${props.match.params.filename}`);
      if (response.status === 200) {
        const markdown = await response.text();
        const replaced = markdown
          .replace(
            /\\\(([\s\S]*?)\\\)/,
            '<span is="inline-math" math="$1"></span>'
          )
          .replace(
            /\\\[([\s\S]*?)\\\]/,
            '<div is="display-math" math="$1"></div>'
          );
        const source = await promisify<string, any, string>(marked)(replaced, {
          renderer
        });
        const doc = parser.parseFromString(source, "text/html");
        doc.querySelectorAll("h1,h2,h3,h4,h5").forEach(element => {
          element.setAttribute("id", slugify(element.innerHTML));
        });
        dispatch({ source });
      }
    })();
  }, [props.match.params.filename]);
  return (
    <div className="row">
      <div className="col-md-9">
        <div dangerouslySetInnerHTML={{ __html: state.source }} />
      </div>
      <div className="col-md-3">
        <TableOfContents
          source={state.source}
          filename={props.match.params.filename}
        />
      </div>
    </div>
  );
};

export default Page;
