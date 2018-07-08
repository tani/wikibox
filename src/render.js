import Marked from 'marked';
import HighlightJS from 'highlight.js';
import typesetMathJax from './typeset';

Marked.setOptions({
  highlight(code) {
    return HighlightJS.highlightAuto(code).value;
  },
});

export default (markdown) => {
  const div = window.document.createElement('div');
  div.innerHTML = markdown.replace(/</mg, '&lt;').replace(/>/mg, '&gt;').replace(/```([^]*?)```/mg, (_, code) => `<pre><code>${code}</code></pre>`);
  typesetMathJax(div);
  const markdownAndCommoHTML = div.innerHTML.replace(/&lt;/mg, '<').replace(/&gt;/mg, '>').replace(/<pre><code>([^]*?)<\/code><\/pre>/, (_, code) => `\`\`\`${code}\`\`\``);
  return Marked(markdownAndCommoHTML);
};
