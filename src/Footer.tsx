import React from "react";
import ReactMarkdown from "react-markdown";
import RemarkMath from "remark-math";
import KaTeX from "react-katex";

const renderers = {
  inlineMath(p: { value: string }) {
    return <KaTeX.InlineMath math={p.value} />;
  },
  math(p: { value: string }) {
    return <KaTeX.BlockMath math={p.value} />;
  }
};

export default () => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./footer.md");
      if (response.status === 200) {
        dispatch({ source: await response.text() });
      }
    })();
  }, [state.source]);
  return (
    <ReactMarkdown
      source={state.source}
      plugins={[RemarkMath]}
      renderers={renderers}
    />
  );
};
