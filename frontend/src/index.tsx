import React from "react";
import { render } from "react-dom";
import App from "./App";
require(`bootswatch/dist/${process.env.THEME}/bootstrap.css`);
require("katex/dist/katex.css");
render(<App />, document.getElementById("root"));
