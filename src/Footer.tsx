import React from "react";
import Container from "react-bootstrap/esm/Container";

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
    <Container>
      <div dangerouslySetInnerHTML={{ __html: state.source }} />
    </Container>
  );
};
