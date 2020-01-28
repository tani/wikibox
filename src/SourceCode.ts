import { wrap } from "comlink";
interface Renderer {
  render(code: string, language: string, theme: string): string;
}
const renderer = wrap<Renderer>(
  new Worker("./SourceCode.worker", { type: "module" })
);

class SourceCode extends HTMLDivElement {
  constructor() {
    super();
    const theme = this.getAttribute("theme") || "";
    const language = this.getAttribute("language") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    (async () => {
      shadow.innerHTML = await renderer.render(this.innerHTML, language, theme);
    })();
  }
}

customElements.define("source-code", SourceCode, { extends: "div" });
