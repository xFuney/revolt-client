"use strict";

const { BrowserWindow, nativeImage } = require('electron');
const path = require('path');

const Logger = require('../common/Logging')
const Config = require('../common/Configuration')

var WindowIcon = nativeImage.createFromPath( path.join(__dirname, "mw_data", "img", "revolt-logo.png") );
WindowIcon.setTemplateImage(true);

module.exports.create = function() {
    Logger.log('settings_window', 'Creating settings window...')
    global.settings_win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      minWidth: Config.Config_Get("minimum_window_size_toggle") ? 800 : 0,
      minHeight: Config.Config_Get("minimum_window_size_toggle") ? 600 : 0,
      icon: WindowIcon,
      backgroundColor: "#191919",
      /*webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }*/
      webPreferences: {
          webviewTag: true,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false,
      }
    })
  
    global.settings_win.setMenuBarVisibility(false)
    global.settings_win.loadFile(path.join(__dirname, "mw_data", "settings.html"))
  }
  