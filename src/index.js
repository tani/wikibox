import { html } from "htm/preact";
import { render } from "preact";
import App from "./App";
import "bootstrap";

render(
  html`<${App} />`,
  document.body
);
