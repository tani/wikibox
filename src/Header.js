import { html, useEffect, useState } from "htm/preact/standalone";

export default ({ filename }) => {
  const [state, dispatch] = useState({
    navigation: [{ href: "", text: "", dropdown: [{ href: "", text: "" }] }],
    title: ""
  });
  useEffect(() => {
    fetch(filename)
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const title = document.querySelector("title");
        if (title) {
          title.innerHTML = doc.querySelector("h1")?.innerHTML || "";
        }
        const navigation = Array.from(doc.querySelectorAll("menu > li")).map(
          element => ({
            href: element.querySelector("a")?.getAttribute("href") || "",
            dropdown: Array.from(element.querySelectorAll("li")).map(
              element1 => ({
                href: element1.querySelector("a")?.getAttribute("href") || "",
                text: element1.querySelector("a")?.innerHTML || ""
              })
            ),
            text: element.querySelector("a")?.innerHTML || ""
          })
        );
        dispatch({
          navigation,
          title: doc.querySelector("h1")?.innerHTML || ""
        });
      });
  }, [filename]);
  return html`
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#/">
        ${state.title}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapse"
        aria-controls="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapse">
        <ul class="navbar-nav mr-auto">
          ${state.navigation.map(item =>
            item.dropdown.length === 0
              ? html`
                <li class="nav-item" key=${item.text}>
                  <a class="nav-link" href=${item.href}>
                    ${item.text}
                  </a>
                </li>
              `
              : html`
                <li class="nav-item dropdown" key={item.text}>
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    ${item.text}
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    ${item.dropdown.map(
                      item1 => html`
                      <a
                        class="dropdown-item"
                        key=${item1.text}
                        href=${item1.href}
                      >
                        ${item1.text}
                      </a>
                    `
                    )}
                  </div>
                </li>
              `
          )}
        </ul>
      </div>
    </nav>
  `;
};
