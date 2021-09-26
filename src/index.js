import React from "react";
import ReactDom from "react-dom";
import App from "./App";

// Add Scss And Bootstrap ( yarn add -D  bootstrap@4.5.2 )
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles/index.scss";

ReactDom.render(<App />, document.getElementById("electron-app"));
