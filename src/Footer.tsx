import React from "react";
import ReactMarkdown from "react-markdown";
const RemarkMath = require("remark-math");
const KaTeX = require("react-katex");

const renderers = {
  inlineMath(p: { value: any }) {
    return <KaTeX.InlineMath math={p.value} />;
  },
  math(p: { value: any }) {
    return <KaTeX.BlockMath math={p.value} />;
  }
};
export default () => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./footer.md");
      if(response.status == 200) {
        dispatch({ source: await response.text() });
      }
    })();
  });
  return (
    <ReactMarkdown
      source={state.source}
      plugins={[RemarkMath]}
      renderers={renderers}
    />
  );
}
