const { app, BrowserWindow, Menu, Tray } = require('electron')
const Logger = require('../common/Logging.js')

const Config = require('../common/Configuration')

const TrayHandler = require('./tray')

const path = require('path')

var win;

function createWindow () {
  let frame_toggle = true

  if (process.platform == "linux" || Config.Config_Get("linux_top_bar_toggle")) {
    frame_toggle = false
  }

  Logger.log('main_window', 'Creating main window...')
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: frame_toggle,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "mw_data", "img", "revolt-logo.png"),
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

  win.setMenuBarVisibility(false)
  win.loadFile(path.join(__dirname, "mw_data", "index.html"))
}

app.whenReady().then(() => {
  Logger.log('main_window', 'App ready, creating window...')
  
  createWindow()

  TrayHandler.init(win)

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




