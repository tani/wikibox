import React from "react";
import { Container } from "react-bootstrap";
export default () => {
  const [state, dispatch] = React.useState({ source: "" });
  React.useEffect(() => {
    (async () => {
      const response = await fetch("./footer.html");
      if (response.status === 200) {
        dispatch({ source: await response.text() });
      }
    })();
  }, []);
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: state.source }} />
    </Container>
  );
};
