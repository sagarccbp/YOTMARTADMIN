import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import "bootstrap/dist/css/bootstrap.min.css";

import * as jQuery from "jquery";
import "jqvmap/dist/jqvmap.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

import "owl.carousel/dist/assets/owl.carousel.min.css";
import "dropzone/dist/min/dropzone.min.css";

import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";


// import "./index.css";
import "chocolat/dist/css/chocolat.css";

import "ionicons201/css/ionicons.min.css";
import "selectric/public/selectric.css";

import "@mdi/font/css/materialdesignicons.min.css";
import * as serviceWorker from "./serviceWorker";
import "flag-icon-css/css/flag-icon.css";
// import "bootstrap-timepicker/css/bootstrap-timepicker.min.css"
import "./assets/css/components.css";

import "./assets/css/custom.css";
import 'react-toastify/dist/ReactToastify.css';



window.jQuery = jQuery;
window.$ = jQuery;

require("sweetalert/dist/sweetalert.min.js");
require("bootstrap-timepicker/css/bootstrap-timepicker.min.css");
require("bootstrap-timepicker/js/bootstrap-timepicker.js");
require("bootstrap-daterangepicker/daterangepicker.js");
require("bootstrap-daterangepicker/daterangepicker.css");
require("bootstrap-timepicker/js/bootstrap-timepicker.js");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/duotone-dark.css");
require("codemirror/lib/codemirror.js");
require("codemirror/mode/javascript/javascript.js");

require("popper.js/dist/popper.min");
require("jquery/dist/jquery.min");
require("jquery-ui-dist/jquery-ui.min.js");

var moment = require("moment/min/moment.min.js");


require("select2/dist/js/select2.full");
require("bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min");

require("bootstrap-daterangepicker/daterangepicker");
require("bootstrap-timepicker/js/bootstrap-timepicker.min");
require("bootstrap/dist/js/bootstrap.min");
require("bootstrap-select/dist/js/bootstrap-select");
require("jquery.nicescroll/dist/jquery.nicescroll.js");

require("selectric/public/jquery.selectric.min.js");
window.moment = moment;
require("prismjs/themes/prism.css");
require("izitoast/dist/css/iziToast.min.css");
window.Chart = require("chart.js/dist/Chart.min");
//
// JS Libraies
require("izitoast/dist/js/iziToast.min.js");

require("jquery-sparkline/jquery.sparkline.min");
require("jqvmap/dist/jquery.vmap.min");
require("jqvmap/dist/maps/jquery.vmap.world");
require("jqvmap/dist/maps/jquery.vmap.france.js");
require("owl.carousel/dist/owl.carousel.min");
require("prismjs/prism.js");
require("dropzone/dist/min/dropzone.min.js");
require("chocolat/dist/js/jquery.chocolat.min.js");
require("bootstrap-daterangepicker/daterangepicker.js");
require("bootstrap-timepicker/js/bootstrap-timepicker.min.js");
require("./js/js/scripts");
require("./js/js/custom");
require("./js/js/stisla");



ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>{" "}
  </BrowserRouter>,
  document.getElementById("root")
);

