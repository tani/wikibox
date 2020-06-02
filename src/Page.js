import { html } from "htm/preact";
import { useEffect, useState } from "preact/hooks";
import { createElement } from "preact";

import unified from "unified";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax/chtml";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";

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
    .getElementById(id)
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

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remark2rehype)
  .use(rehypeMathJax, {fontURL: "lib"})
  .use(rehypeHighlight)
  .use(rehypeSlug)
  .use(rehypeReact, { createElement });

const vdom2toc = (vdom) => {
  const toc = [];
  for(const v of vdom.props.children) {
    for(let level = 1; level < 6; level++) {
      if (v?.type === `h${level}`) {
        toc.push({ level: level, slug: v.props.id, text: v.props.children})
      }
    }
  }
  return toc;
};

const Page = ({ filename }) => {
  const [state, dispatch] = useState({
    result: html`<div />`,
    toc: []
  });
  useEffect(() => {
    fetch(`./page/${filename}`)
      .then(response => response.text())
      .then((text) => {
          processor.process(text, (err, file) => {
            if (err) throw err;
            dispatch({ result: file.result, toc: vdom2toc(file.result) });
          });
      });
  }, [filename]);
  return html`
    <div class="row">
      <div class="col-md-9" children=${[state.result]}>
      </div>
      <div class="col-md-3">
        <${TableOfContents} toc=${state.toc} />
      </div>
    </div>
  `;
};

export default Page;
