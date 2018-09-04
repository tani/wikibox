import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
  NavbarToggler,
  Collapse
} from "reactstrap";
import React, { Component } from "react";
import { fromNullable } from "fp-ts/lib/Option";
import markdown from "./markdown";

interface HeaderProps {}
interface HeaderState {
  isOpen: boolean;
  title: string;
  navigation: {
    href: string;
    text: string;
    subnavigation: { href: string; text: string }[];
  }[];
}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isOpen: false,
      title: "",
      navigation: []
    };
    this.handleTogglerClick = this.handleTogglerClick.bind(this);
  }
  handleTogglerClick() {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }
  componentDidMount() {
    (async () => {
      const response = await fetch("./header.md");
      const source = await response.text();
      const div = document.createElement("div");
      div.innerHTML = await markdown(source);
      const h1 = fromNullable(div.querySelector("h1"))
        .map(_ => _.innerHTML)
        .getOrElse("");
      const title = fromNullable(document.querySelector("title"))
        .map(_ => (_.innerHTML = h1))
        .getOrElse("");
      const navigation = fromNullable(div.querySelector("ul"))
        .map(_ =>
          Array.from(_.children).map(item => {
            const subnavigation = Array.from(item.querySelectorAll("li")).map(
              subitem => {
                const a = fromNullable(subitem.querySelector("a"));
                return {
                  href: a.map(_ => _.href).getOrElse(""),
                  text: a.map(_ => _.innerHTML).getOrElse("")
                };
              }
            );
            const a = fromNullable(item.querySelector("a"));
            return {
              href: a.map(_ => _.href).getOrElse(""),
              text: a.map(_ => _.innerHTML).getOrElse(""),
              subnavigation
            };
          })
        )
        .getOrElse([]);
      this.setState({
        title,
        navigation
      });
    })();
  }
  render() {
    return (
      <Navbar color="primary" dark expand="md">
        <NavbarToggler onClick={this.handleTogglerClick} />
        <NavbarBrand href="./" className="text-light">{this.state.title}</NavbarBrand>
        <Collapse navbar isOpen={this.state.isOpen}>
          <Nav navbar>
            {this.state.navigation.map(
              item =>
                item.subnavigation.length === 0 ? (
                  <NavItem key={item.text}>
                    <NavLink href={item.href}>{item.text}</NavLink>
                  </NavItem>
                ) : (
                  <UncontrolledDropdown key={item.text} inNavbar>
                    <DropdownToggle nav caret>
                      {item.text}
                    </DropdownToggle>
                    <DropdownMenu>
                      {item.subnavigation.map(subitem => (
                        <DropdownItem key={subitem.text}>
                          <NavLink href={subitem.href}>{subitem.text}</NavLink>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
