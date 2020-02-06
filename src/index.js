import { html, render } from "htm/preact/standalone";
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
