import { wrap } from "comlink";

const renderer = wrap(new Worker("./LaTeX.worker", { type: "module" }));

class DisplayMath extends HTMLDivElement {
  constructor() {
    super();
    this.initialize();
  }
  async initialize() {
    const math = this.innerHTML;
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(math, true);
  }
}

customElements.define("display-math", DisplayMath, { extends: "div" });

class InlineMath extends HTMLSpanElement {
  constructor() {
    super();
    this.initialize();
  }
  async initialize() {
    const math = this.innerHTML;
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = await renderer.render(math, false);
  }
}

customElements.define("inline-math", InlineMath, { extends: "span" });
