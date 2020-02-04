import { h } from "preact";
import { RoutableProps } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { wrap } from "comlink";

const tocListStyle = {
  borderLeft: "solid 1px rgba(32,32,32,0.2)",
  listStyle: "none",
  paddingBottom: 5,
  paddingLeft: 20,
  paddingTop: 5,
  position: "sticky" as "sticky",
  top: 20
};

type Toc = { level: number; text: string; slug: string }[];

const TableOfContents = ({ toc }: { toc: Toc }) => {
  return (
    <ul style={tocListStyle} className="d-none d-md-block">
      {toc.map(item => (
        <li style={{ paddingLeft: `${item.level - 1}em` }} key={item.text}>
          <a
            href="javascript:void(0)"
            onClick={() => {
              document
                .getElementById(item.slug)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

interface Renderer {
  render(markdown: string): { result: string; toc: Toc };
}

const renderer = wrap<Renderer>(
  new Worker("./Markdown.worker", { type: "module" })
);

interface PageProps extends RoutableProps {
  filename?: string;
}

const Page = ({ filename }: PageProps) => {
  const [state, dispatch] = useState<{ result: string; toc: Toc }>({
    result: "",
    toc: []
  });
  useEffect(() => {
    (async () => {
      const response = await fetch(`./page/${filename}`);
      const markdown = await response.text();
      const { result, toc } = await renderer.render(markdown);
      dispatch({ result, toc });
    })();
  }, [filename]);
  return (
    <div className="row">
      <div className="col-md-9">
        <div dangerouslySetInnerHTML={{ __html: state.result }} />
      </div>
      <div className="col-md-3">
        <TableOfContents toc={state.toc} />
      </div>
    </div>
  );
};

export default Page;
