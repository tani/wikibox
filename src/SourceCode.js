import { wrap } from "comlink";

const renderer = wrap(new Worker("./SourceCode.worker", { type: "module" }));

class SourceCode extends HTMLDivElement {
  constructor() {
    super();
    this.initialize();
  }
  async initialize() {
    const theme = this.getAttribute("theme") || "";
    const language = this.getAttribute("language") || "";
    const code = this.innerHTML;
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(code, language, theme);
  }
}

customElements.define("source-code", SourceCode, { extends: "div" });
