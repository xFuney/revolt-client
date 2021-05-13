"use strict";

const app = require('electron');

const version_info = require('./version_info')

console.log("Bootstrap handoff.")
// hand off to the bootstrapper.
require('./bootstrap')