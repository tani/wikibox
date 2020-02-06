import { html } from "htm/preact/standalone";
import { Router } from "preact-router";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import Redirect from "./Redirect";
import { createHashHistory } from "history";

const App = () => html`
    <${Header} filename="page/header.html" />
    <div class="container" style="marginTop: 20;">
      <${Router} history=${createHashHistory()}>
        <${Page} path="/page/:filename" />
        <${Redirect} default to="/page/index.md" />
      <//>
    </div>
    <${Footer} filename="page/footer.html" />
`;

export default App;
