import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import slugify from "slugify";
import { load } from "cheerio";
export default () => {
  const [state, dispatch] = React.useState({
    navigation: [
      { href: "", text: "", subnavigation: [{ href: "", text: "" }] }
    ],
    title: ""
  });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./header.html");
      const $ = load(await response.text());
      const title = document.querySelector("title");
      if (title) {
        title.innerHTML = $("h1").text();
      }
      const navigation = $("menu > li")
        .toArray()
        .map(element => ({
          href: $("> a", element).attr("href"),
          subnavigation: $("li", element)
            .toArray()
            .map(element1 => ({
              href: $("> a", element1).attr("href"),
              text: $("> a", element1).text()
            })),
          text: $("> a", element).text()
        }));
      dispatch({
        navigation,
        title: $("h1").text()
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
