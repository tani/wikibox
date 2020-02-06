import { html } from "htm/preact"
import { useEffect, useState } from "preact/hooks";
import { wrap } from "comlink";

const TableOfContentsStyle = {
  borderLeft: "solid 1px rgba(32,32,32,0.2)",
  listStyle: "none",
  paddingBottom: 5,
  paddingLeft: 20,
  paddingTop: 5,
  position: "sticky",
  top: 20
};

const scrollTo = (id) => {
  document
    .getElementById(item.slug)
    ?.scrollIntoView({ behavior: "smooth" });
}

const TableOfContents = ({ toc }) => html`
    <ul style=${TableOfContentsStyle} class="d-none d-md-block">
      ${toc.map(item => html`
        <li style=${{ paddingLeft: `${item.level - 1}em` }} key=${item.text}>
          <a href="javascript:void(0)"
             onClick=${() => scrollTo(item.slug)}>
            ${item.text}
          </a>
        </li>
      `)}
    </ul>
  `;

const renderer = wrap(new Worker("./Markdown.worker", { type: "module" }));

const Page = ({ filename }) => {
  const [state, dispatch] = useState({
    result: "",
    toc: []
  });
  useEffect(() => {
    fetch(`./page/${filename}`)
      .then(response => response.text())
      .then(text => renderer.render(text))
      .then(({ result, toc }) => dispatch({ result, toc }));
  }, [filename]);
  return html`
    <div class="row">
      <div class="col-md-9">
        <div dangerouslySetInnerHTML=${{ __html: state.result }}/>
      </div>
      <div class="col-md-3">
        <${TableOfContents} toc=${state.toc} />
      </div>
    </div>
  `;
};

export default Page;
