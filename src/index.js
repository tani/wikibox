import { html, render } from "htm/preact";

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
