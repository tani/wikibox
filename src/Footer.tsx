import React from "react";
export default () => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./footer.html");
      if (response.status === 200) {
        dispatch({ source: await response.text() });
      }
    })();
  }, [state.source]);
  return <div dangerouslySetInnerHTML={{ __html: state.source }} />;
};
