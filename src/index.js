import unified from "unified";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax/chtml";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remark2rehype)
  .use(rehypeMathJax, { fontURL: "lib" })
  .use(rehypeHighlight)
  .use(rehypeSlug)
  .use(rehypeStringify);

Promise.all([
    fetch("./page/header.html").then(r=>r.text()),
    fetch("./page/footer.html").then(r=>r.text()),
    fetch(window.location.href.replace(/^.*#\//, '')).then(r=>r.text())
]).then(([header, footer, main])=>{
    document.body.innerHTML = `
        <header>
            ${header}
        </header>
        <main>
            ${processor.processSync(main)}
        </main>
        <footer>
            ${footer}
        </footer>
    `
})