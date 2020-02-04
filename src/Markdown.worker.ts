import { expose } from "comlink";
import marked, { Renderer, Slugger } from "marked";

type Toc = { level: number; text: string; slug: string }[];

function encode(rawStr: string) {
  return rawStr.replace(/[\s\S]/g, i => "&#" + i.charCodeAt(0) + ";");
}

expose({
  render(markdown: string): { result: string; toc: Toc } {
    const renderer = new Renderer();
    const toc: Toc = [];
    renderer.code = (code: string, languageAndTheme: string): string => {
      const language = languageAndTheme.replace(/\s.*/, "");
      const theme = languageAndTheme.replace(/.*\s/, "");
      return `<div is="source-code" language="${language}" theme="${theme}">
                ${encode(code)}
              </div>`;
    };
    renderer.heading = (
      text: string,
      level: number,
      raw: string,
      slugger: Slugger
    ): string => {
      const slug = slugger.slug(raw);
      toc.push({ level, text, slug });
      return `<h${level} id="${slug}">${text}</h${level}>`;
    };
    const replaced = markdown
      .replace(
        /\\\(([\s\S]*?)\\\)/,
        (_, math) => `<span is="inline-math">${encode(math)}</span>`
      )
      .replace(
        /\\\[([\s\S]*?)\\\]/,
        (_, math) => `<div is="display-math">${encode(math)}</div>`
      );
    const result = marked(replaced, { renderer });
    return { result, toc };
  }
});
