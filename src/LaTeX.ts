import { wrap } from "comlink";

interface Renderer {
  styleSheet: string;
  render(math: string, display: boolean): string;
}

const renderer = wrap<Renderer>(
  new Worker("./LaTeX.worker", { type: "module" })
);
const style = document.createElement("style");
document.head.appendChild(style);
(async () => {
  style.innerHTML = await renderer.styleSheet;
})();

class DisplayMath extends HTMLDivElement {
  public constructor() {
    super();
    const math = this.getAttribute("math") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    (async () => {
      shadow.innerHTML = await renderer.render(math, true);
    })();
  }
}

customElements.define("display-math", DisplayMath, { extends: "div" });

class InlineMath extends HTMLSpanElement {
  public constructor() {
    super();
    const math = this.getAttribute("math") || "";
    const shadow = this.attachShadow({ mode: "closed" });
    (async () => {
      shadow.innerHTML = await renderer.render(math, false);
    })();
  }
}

customElements.define("inline-math", InlineMath, { extends: "span" });
