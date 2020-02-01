import { wrap } from "comlink";

interface Renderer {
  render(code: string, language: string, theme: string): string;
}

const renderer = wrap<Renderer>(
  new Worker("./SourceCode.worker", { type: "module" })
);

class SourceCode extends HTMLDivElement {
  public constructor() {
    super();
    this.initialize();
  }
  private async initialize() {
    const theme = this.getAttribute("theme") || "";
    const language = this.getAttribute("language") || "";
    const code = this.getAttribute("code") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(code, language, theme);
  }
}

customElements.define("source-code", SourceCode, { extends: "div" });
