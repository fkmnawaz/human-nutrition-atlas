import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './style.css';

import { App } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {

    const app = new App();

    app.start();

});