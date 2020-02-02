import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default (props: { filename: string }) => {
  const [state, dispatch] = useState({ source: "" });
  useEffect(() => {
    (async () => {
      const response = await fetch(props.filename);
      if (response.status === 200) {
        dispatch({ source: await response.text() });
      }
    })();
  }, [props.filename]);
  return (
    <div
      className="container"
      dangerouslySetInnerHTML={{ __html: state.source }}
    />
  );
};
