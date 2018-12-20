import React from "react";
import ReactDOM from "react-dom";

import App from "./views/App";
import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import './../../css/style.css';
import './../../css/main.css';

import "bootstrap/dist/js/bootstrap.min.js";

if (document.getElementById('root')) {
    ReactDOM.render(Routes, document.getElementById('root'));
}