import { fromNullable } from "fp-ts/lib/Option";
import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import slugify from "slugify";
import markdown from "./markdown";

export default () => {
  const [state, dispatch] = React.useState({
    navigation: [
      { href: "", text: "", subnavigation: [{ href: "", text: "" }] }
    ],
    title: ""
  });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./header.md");
      const div = document.createElement("div");
      if (response.status === 200) {
        div.innerHTML = await markdown(await response.text());
      }
      const h1 = fromNullable(div.querySelector("h1"))
        .map($h1 => $h1.innerHTML)
        .getOrElse("");
      const title = fromNullable(document.querySelector("title"))
        .map($title => ($title.innerHTML = h1))
        .getOrElse("");
      const navigation = fromNullable(div.querySelector("ul"))
        .map(ul =>
          Array.from(ul.children).map(child => {
            const subnavigation = Array.from(child.querySelectorAll("li")).map(
              subitem => {
                const b = fromNullable(subitem.querySelector("a"));
                return {
                  href: b.map($b => $b.href).getOrElse(""),
                  text: b.map($b => $b.innerHTML).getOrElse("")
                };
              }
            );
            const a = fromNullable(child.querySelector("a"));
            return {
              href: a.map($a => $a.href).getOrElse(""),
              subnavigation,
              text: a.map($a => $a.innerHTML).getOrElse("")
            };
          })
        )
        .getOrElse([]);
      dispatch({
        navigation,
        title
      });
    })();
  }, [state.navigation, state.title]);
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Toggle area-controls="collapse" />
      <Navbar.Brand href="#/">{state.title}</Navbar.Brand>
      <Navbar.Collapse id="collapse">
        <Nav>
          {state.navigation.map(item => {
            if (item.subnavigation.length === 0) {
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
                  {item.subnavigation.map(subitem => (
                    <NavDropdown.Item key={subitem.text} href={subitem.href}>
                      {subitem.text}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              );
            }
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
