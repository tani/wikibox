/**
 *                                WikiBox
    ==================================================================== 
    - Homepage https://github.com/nzt/wikibox
    - Copyright (c) 2020 TANIGUCHI Masaya All Right Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { html } from "htm/preact";
import { Router } from "preact-router";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import Redirect from "./Redirect";
import { createHashHistory } from "history";

const App = () => html`
    <${Header} filename="page/header.html" />
    <div class="container" style=${{ marginTop: 20 }}>
      <${Router} history=${createHashHistory()}>
        <${Page} path="/page/:filename" />
        <${Redirect} default to="/page/index.md" />
      </${Router}>
    </div>
    <${Footer} filename="page/footer.html" />
`;

export default App;
