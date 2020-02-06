import { html } from "htm/preact";
import { useEffect, useState } from "preact/hooks";

export default ({ filename }) => {
  const [state, dispatch] = useState({ source: "" });
  useEffect(() => {
    fetch(filename)
      .then(response => response.text())
      .then(source => dispatch({ source }));
  }, [filename]);
  return html`
    <div class="container" dangerouslySetInnerHTML="${{ __html: state.source }}" />
  `;
};
