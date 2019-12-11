import { wrap } from "comlink";
interface IRenderer {
  styleSheet: string;
  render(math: string, display: boolean): string;
}
const renderer = wrap<IRenderer>(new Worker("./LaTeX.worker", { type: 'module' }));
const style = document.createElement("style");
document.head.appendChild(style);
(async () => {
  style.innerHTML = await renderer.styleSheet;
})();

class DisplayMath extends HTMLDivElement {
  public constructor() {
    super();
    (async () => {
      this.innerHTML = await renderer.render(this.innerHTML, true);
    })();
  }
}

customElements.define("display-math", DisplayMath, { extends: "div" });

class InlineMath extends HTMLSpanElement {
  public constructor() {
    super();
    (async () => {
      this.innerHTML = await renderer.render(this.innerHTML, false);
    })();
  }
}

customElements.define("inline-math", InlineMath, { extends: "span" });
