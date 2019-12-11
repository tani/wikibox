import React from "react";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import slugify from "slugify";

export default () => {
  const [state, dispatch] = React.useState({
    navigation: [{ href: "", text: "", dropdown: [{ href: "", text: "" }] }],
    title: ""
  });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./header.html");
      const parser = new DOMParser();
      const doc = parser.parseFromString(await response.text(), "text/html");
      if (response.status === 200) {
        const title = document.querySelector("title");
        if (title) {
          title.innerHTML = doc.querySelector("h1")?.innerHTML || "";
        }
        const navigation = Array.from(doc.querySelectorAll("menu > li"))
          .map(element => ({
            href: element.querySelector("a")?.getAttribute("href") || "",
            dropdown: Array.from(element.querySelectorAll("li"))
              .map(element1 => ({
                href: element1.querySelector("a")?.getAttribute("href") || "",
                text: element1.querySelector("a")?.innerHTML || ""
              })),
            text: element.querySelector("a")?.innerHTML || ""
          }));
        dispatch({
          navigation,
          title: doc.querySelector("h1")?.innerHTML || ""
        });
      }
    })();
  }, []);
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Toggle area-controls="collapse" />
      <Navbar.Brand href="#/">{state.title}</Navbar.Brand>
      <Navbar.Collapse id="collapse">
        <Nav>
          {state.navigation.map(
            (item): ReturnType<React.FC> => {
              if (item.dropdown.length === 0) {
                return (
                  <Nav.Link
                    key={item.text}
                    href={item.href}
                    style={{ cursor: "pointer" }}
                  >
                    {item.text}
                  </Nav.Link>
                );
              } else {
                return (
                  <NavDropdown
                    title={item.text}
                    id={slugify(item.text)}
                    key={item.text}
                  >
                    {item.dropdown.map(
                      (item1): ReturnType<React.FC> => (
                        <NavDropdown.Item key={item1.text} href={item1.href}>
                          {item1.text}
                        </NavDropdown.Item>
                      )
                    )}
                  </NavDropdown>
                );
              }
            }
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
