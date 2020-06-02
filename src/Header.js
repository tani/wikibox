/**
 *                                WikiBox
    ==================================================================== 
    - Homepage https://github.com/nzt/wikibox
    - Copyright (c) 2020 TANIGUCHI Masaya All Right Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { html } from "htm/preact"
import { useEffect, useState } from "preact/hooks";

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
        const title = document.getElementsByTagName("title")[0];
        title.innerHTML = doc.getElementsByTagName("h1")[0]?.innerHTML || "";
        const navigation = Array.from(doc.querySelectorAll("menu > li")).map(
          element => ({
            href: element.getElementsByTagName("a")[0]?.getAttribute("href") || "",
            dropdown: Array.from(element.getElementsByTagName("li")).map(
              element1 => ({
                href: element1.getElementsByTagName("a")[0]?.getAttribute("href") || "",
                text: element1.getElementsByTagName("a")[0]?.innerHTML || ""
              })
            ),
            text: element.getElementsByTagName("a")[0]?.innerHTML || ""
          })
        );
        dispatch({
          navigation,
          title: doc.getElementsByTagName("h1")[0]?.innerHTML || ""
        });
      });
  }, [filename]);
  return html`
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#/">
        ${state.title}
      </a>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapse"
              aria-controls="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation">
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
                  <a class="nav-link dropdown-toggle"
                     href="#"
                     role="button"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false">
                    ${item.text}
                  </a>
                  <div class="dropdown-menu"
                       aria-labelledby="navbarDropdown">
                    ${item.dropdown.map(
                      item1 => html`
                      <a class="dropdown-item"
                         key=${item1.text}
                         href=${item1.href}>
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
