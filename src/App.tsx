import { h } from "preact";
import { Router } from "preact-router";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import { createHashHistory } from "history";

const App = () => (
  <div>
    <Header filename="page/header.html" />
    <div className="container" style={{ marginTop: 20 }}>
      <Router history={createHashHistory()}>
        <Page path="/page/:filename"></Page>
      </Router>
    </div>
    <Footer filename="page/footer.html" />
  </div>
);

export default App;
