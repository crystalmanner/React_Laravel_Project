import ReactDOM from "react-dom";

import Routes from "./routes";

import loadFonts from "./utils/fontLoader";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/css/style.css";
import "./assets/css/main.css";

import "bootstrap/dist/js/bootstrap.min.js";

loadFonts();

ReactDOM.render(Routes, document.getElementById("root"));
