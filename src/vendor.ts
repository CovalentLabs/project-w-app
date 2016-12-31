// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import 'rxjs';
import '@angularclass/hmr';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
import './public/global.scss'
import 'hammerjs'
import 'jquery'

// Tether, for tooltips etc
import Tether = require('tether')
// Required to bind to window for Bootstrap to pick Tether up.
; (<any> window).Tether = Tether

import 'bootstrap'
