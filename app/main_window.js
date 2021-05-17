"use strict";

const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const Logger = require('../common/Logging')

const Config = require('../common/Configuration')

const TrayHandler = require('./tray')

const ipcHandler = require('./ipc')

const path = require('path')

var WindowIcon = nativeImage.createFromPath( path.join(__dirname, "mw_data", "img", "revolt-logo.png") );
WindowIcon.setTemplateImage(true);

function createWindow () {
  let frame_toggle = false

  if (process.platform == "linux" && !Config.Config_Get("linux_top_bar_toggle")) {
    Logger.log('main_window', 'On Linux without platform-specific frame toggler set - use WM frame.')
    frame_toggle = true
  }

  Logger.log('main_window', 'Creating main window...')
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: frame_toggle,
    minWidth: Config.Config_Get("minimum_window_size_toggle") ? 800 : 0,
    minHeight: Config.Config_Get("minimum_window_size_toggle") ? 600 : 0,
    icon: WindowIcon,
    backgroundColor: "#242424",
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

  global.win.setMenuBarVisibility(false)
  global.win.loadFile(path.join(__dirname, "mw_data", "index.html"))

}

app.whenReady().then(() => {
  Logger.log('main_window', 'App ready, creating window...')
  
  createWindow()

  TrayHandler.init(win, WindowIcon)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})




setInterval( () => {
  let met = app.getAppMetrics()
  

  if (win) {
    win.webContents.send('metrics_update', met)
  }
}, 1000)