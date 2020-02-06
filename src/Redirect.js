import { html, useEffect } from "htm/preact/standalone";
import { route } from "preact-router";

export default ({ to }) => {
  useEffect(() => {
    route(to);
  }, [to]);
  return html`
    <p>Redirect</p>
  `;
};
