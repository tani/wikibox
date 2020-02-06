import { html } from "htm/preact";
import { render } from "preact";

import App from "./App";
render(
  html`
    <${App} />
  `,
  document.body
);
import("bootstrap");
import("./LaTeX");
import("./SourceCode");
