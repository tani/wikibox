import React from "react";
import { render } from "react-dom";
import App from "./App";
import "latex-elements/dist/latex-elements.min.js";
import "code-elements/dist/code-elements.min.js";
import "bootswatch/dist/%THEME%/bootstrap.css";
render(<App />, document.getElementById("root"));
