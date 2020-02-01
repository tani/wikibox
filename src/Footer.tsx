import React from "react";

export default (props: { filename: string }) => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
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
