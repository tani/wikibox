import { html } from "htm/preact";
import { useEffect } from "preact/hooks";

import { route } from "preact-router";

export default ({ to }) => {
  useEffect(() => {
    route(to);
  }, [to]);
  return html`
    <p>Redirect</p>
  `;
};
