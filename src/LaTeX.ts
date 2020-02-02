import { wrap } from "comlink";

interface Renderer {
  render(math: string, display: boolean): string;
}

const renderer = wrap<Renderer>(
  new Worker("./LaTeX.worker", { type: "module" })
);

class DisplayMath extends HTMLDivElement {
  public constructor() {
    super();
    this.initialize();
  }
  private async initialize() {
    const math = this.getAttribute("math") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(math, true);
  }
}

customElements.define("display-math", DisplayMath, { extends: "div" });

class InlineMath extends HTMLSpanElement {
  public constructor() {
    super();
    this.initialize();
  }
  private async initialize() {
    const math = this.getAttribute("math") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(math, false);
  }
}

customElements.define("inline-math", InlineMath, { extends: "span" });
