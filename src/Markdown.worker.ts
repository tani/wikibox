import { expose } from "comlink";
import marked, { Renderer, Slugger } from "marked";

type Toc = { level: number; text: string; slug: string }[];

expose({
  render(markdown: string): { result: string; toc: Toc } {
    const renderer = new Renderer();
    const toc: Toc = [];
    renderer.code = (rawCode: string, languageAndTheme: string): string => {
      const language = languageAndTheme.replace(/\s.*/, "");
      const theme = languageAndTheme.replace(/.*\s/, "");
      const code = rawCode.replace(
        /[\s\S]/g,
        i => "&#" + i.charCodeAt(0) + ";"
      );
      return `<div is="source-code" language="${language}" theme="${theme}" code="${code}"></div>`;
    };
    renderer.heading = (
      text: string,
      level: number,
      raw: string,
      slugger: Slugger
    ): string => {
      toc.push({ level, text, slug: slugger.slug(raw) });
      return `<h${level} id="${slugger.slug(raw)}">${text}</h${level}>`;
    };
    const replaced = markdown
      .replace(/\\\(([\s\S]*?)\\\)/, '<span is="inline-math" math="$1"></span>')
      .replace(/\\\[([\s\S]*?)\\\]/, '<div is="display-math" math="$1"></div>');
    const result = marked(replaced, { renderer });
    return { result, toc };
  }
});
