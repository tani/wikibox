import React from "react";
import { render } from "react-dom";
import App from "./App";
declare const THEME: string;
require(`bootswatch/dist/%THEME%/bootstrap.css`);
require("latex-elements/dist/latex-elements.min.js");
require("code-elements/dist/code-elements.min.js");
render(<App />, document.getElementById("root"));
