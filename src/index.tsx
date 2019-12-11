import React from "react";
import { render } from "react-dom";
import App from "./App";
import("./LaTeX");
import("./SourceCode");
render(<App />, document.getElementById("root"));
