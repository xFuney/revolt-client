"use strict";

// bootstrap runs before display of anything to user.
// initialise stuff here before running.

const {app, Menu} = require("electron");

const version_info = require("./version_info")
const Constants = require('../common/Constants')

// holdover from discord to fix pulseaudio latency.
if (process.platform === 'linux') {
    if (process.env.PULSE_LATENCY_MSEC === undefined) {
        process.env.PULSE_LATENCY_MSEC = 30;
    }
}

// fix pinning to taskbar in windows.
if (process.platform == "win32") {
    app.setAppUserModelId(Constants.APP_ID)
}

console.log("MainWindow handoff.")
require('./main_window.js')