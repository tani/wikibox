import { html, useEffect, useState } from "htm/preact/standalone";

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
