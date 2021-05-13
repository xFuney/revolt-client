"use strict";

const app = require('electron');

const version_info = require('./version_info')
const Constants = require('../common/Constants')

console.log(Constants.APP_VERSION_STRING + "\n");

// hand off to the bootstrapper.
require('./bootstrap')