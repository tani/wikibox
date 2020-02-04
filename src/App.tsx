import { Fragment, h } from "preact";
import { Router } from "preact-router";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import Redirect from "./Redirect";
import { createHashHistory } from "history";

const App = () => (
  <Fragment>
    <Header filename="page/header.html" />
    <div className="container" style={{ marginTop: 20 }}>
      <Router history={createHashHistory()}>
        <Page path="/page/:filename" />
        <Redirect default to="/page/index.md" />
      </Router>
    </div>
    <Footer filename="page/footer.html" />
  </Fragment>
);

export default App;
