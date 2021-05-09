import unified from "unified";
import remarkParse from "remark-parse";
import remark2rehype from "remark-rehype";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax/chtml";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import template from "lodash.template";
import { Dropdown, Collapse } from "bootstrap";
import rehypeTOC from "rehype-toc";

const navbarTemplate = template(`
<nav class="container-fluid navbar navbar-expand-md navbar-dark bg-primary">
    <a class="navbar-brand" href="#/"><%= title %></a>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse"
        aria-controls="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
    />
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapse">
        <ul class="navbar-nav mr-auto">
        <% for (item of navigation) { %>
            <% if (item.dropdown.length === 0) { %>
                <li class="nav-item">
                    <a class="nav-link" href="<%= item.href %>">
                        <%= item.text %>
                    </a>
                </li>
            <% } else { %>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <%= item.text %>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <% for (item1 of item.dropdown) { %>
                        <a class="dropdown-item" href="<%= item1.href %>">
                            <%= item1.text %>
                        </a>
                    <% } %>
                    </div>
                </li>
            <% } %>
        <% } %>
        </ul>
    </div>
</nav>
`);

const parser = new DOMParser();

function compileHeader(text) {
  const doc = parser.parseFromString(text, "text/html");
  const title = doc.getElementsByTagName("h1")[0]?.innerHTML || "";
  const navigation = Array.from(doc.querySelectorAll("menu > li")).map(
    (element) => ({
      href: element.getElementsByTagName("a")[0]?.getAttribute("href") || "",
      dropdown: Array.from(element.getElementsByTagName("li")).map(
        (element1) => ({
          href:
            element1.getElementsByTagName("a")[0]?.getAttribute("href") || "",
          text: element1.getElementsByTagName("a")[0]?.innerHTML || "",
        })
      ),
      text: element.getElementsByTagName("a")[0]?.innerHTML || "",
    })
  );
  document.title = title;
  return navbarTemplate({ title, navigation });
}

const contentPath = location.hash.replace(/#\//, "").replace(/#.*$/, "");
if (contentPath === "") {
  location.href = location.href + "#/page/index.md";
  location.reload();
}

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkMath)
  .use(remark2rehype)
  .use(rehypeMathJax, { fontURL: "lib/fonts" })
  .use(rehypeHighlight)
  .use(rehypeSlug)
  .use(rehypeTOC, {
    customizeTOCItem(item) {
      item.children[0].properties.href =
        "#/" + contentPath + item.children[0].properties.href;
      return item;
    },
    cssClasses: {
      toc: "toc border-start",
    },
  })
  .use(rehypeStringify);

Promise.all([
  fetch("./page/header.html").then((r) => r.text()),
  fetch("./page/footer.html").then((r) => r.text()),
  fetch(contentPath)
    .then((r) => r.text())
    .then(processor.process),
]).then(([header, footer, main]) => {
  const doc = parser.parseFromString(main, "text/html");
  const aside = doc.querySelector("nav").outerHTML;
  doc.querySelector("nav").remove();
  const article = doc.body.innerHTML;
  document.body.innerHTML = `
        <header>
            ${compileHeader(header)}
        </header>
        <main>
            <div class="container py-3 border-bottom">
                <div class="row">
                    <div class="col-md-10">
                        <article>
                            ${article}
                        </article>
                    </div>
                    <div class="col-md-2 d-none d-md-block">
                        <aside>
                            ${aside}
                        </aside>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div class="container py-3">
                ${footer}
            </div>
        </footer>
    `;
  Array.from(document.querySelectorAll("h1,h2,h3,h4,h5")).forEach(
    (e) => (e.id = "/" + contentPath + "#" + e.id)
  );
  Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(
    (e) => new Dropdown(e)
  );
  Array.from(document.querySelectorAll(".collapse")).forEach(
    (e) => new Collapse(e, { toggle: false })
  );
});
