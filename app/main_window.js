const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const Logger = require('../common/Logging.js')

const Config = require('../common/Configuration')

const TrayHandler = require('./tray')

const ipc = require('electron').ipcMain;

const path = require('path')

var WindowIcon = nativeImage.createFromPath( path.join(__dirname, "mw_data", "img", "revolt-logo.png") );
WindowIcon.setTemplateImage(true);

var win;

function createWindow () {
  let frame_toggle = false

  if (process.platform == "linux" && !Config.Config_Get("linux_top_bar_toggle")) {
    Logger.log('main_window', 'On Linux without platform-specific frame toggler set - use WM frame.')
    frame_toggle = true
  }

  Logger.log('main_window', 'Creating main window...')
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: frame_toggle,
    minWidth: 800,
    minHeight: 600,
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

  win.setMenuBarVisibility(false)
  win.loadFile(path.join(__dirname, "mw_data", "index.html"))

  ipc.on('settings-window', () => {
    Logger.log('main_window', 'Opening settings window...')
    createSettingsWindow();
  })

  ipc.on('settings_restart', () => {
    Logger.log('main_window', 'Settings has invoked an IPC relaunch. Relaunching...')
    app.relaunch()
    app.exit()
  })

  ipc.on('reload_main', () => {
    Logger.log('main_window', 'Settings has invoked a main renderer reload. Sending this to main renderer.')
    win.webContents.send('reload_main')
  })
}

function createSettingsWindow () {
  Logger.log('main_window', 'Creating settings window...')
  shwin = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    minWidth: 800,
    minHeight: 600,
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

  shwin.setMenuBarVisibility(false)
  shwin.loadFile(path.join(__dirname, "mw_data", "settings.html"))
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




