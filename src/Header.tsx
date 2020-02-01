import React from "react";
import slugify from "slugify";

export default React.lazy(async () => {
  const response = await fetch("page/header.html");
  const parser = new DOMParser();
  const doc = parser.parseFromString(await response.text(), "text/html");
  const title = document.querySelector("title");
  if (title) {
    title.innerHTML = doc.querySelector("h1")?.innerHTML || "";
  }
  const navigation = Array.from(doc.querySelectorAll("menu > li")).map(
    element => ({
      href: element.querySelector("a")?.getAttribute("href") || "",
      dropdown: Array.from(element.querySelectorAll("li")).map(element1 => ({
        href: element1.querySelector("a")?.getAttribute("href") || "",
        text: element1.querySelector("a")?.innerHTML || ""
      })),
      text: element.querySelector("a")?.innerHTML || ""
    })
  );
  const state = {
    navigation,
    title: doc.querySelector("h1")?.innerHTML || ""
  };
  function Header() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <a className="navbar-brand" href="#/">
          {state.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapse"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapse">
          <ul className="navbar-nav mr-auto">
            {state.navigation.map(item => {
              if (item.dropdown.length === 0) {
                return (
                  <li className="nav-item" key={item.text}>
                    <a className="nav-link" href={item.href}>
                      {item.text}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li
                    className="nav-item dropdown"
                    key={slugify(item.text.toLowerCase())}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id={slugify(item.text.toLowerCase())}
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.text}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {item.dropdown.map(item1 => (
                        <a
                          className="dropdown-item"
                          key={item1.text}
                          href={item1.href}
                        >
                          {item1.text}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </nav>
    );
  }
  Header.displayName = "Header";
  return { default: Header };
});
