const { app, BrowserWindow, Menu, Tray } = require('electron')
const Logger = require('../common/Logging.js')

const path = require('path')

var win;

function createWindow () {
  Logger.log('main_window', 'Creating main window...')
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: process.platform == "linux" ? true : false,
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

function openwebsite() {
  Logger.log('main_window', 'App tray website option selected, opening Revolt site in browser...')
    require('electron').shell.openExternal("https://revolt.chat")
}

function linux_open() {
  win.show()
}

app.whenReady().then(() => {
  Logger.log('main_window', 'App ready, initialising tray...')
    tray = new Tray( path.join(__dirname, "mw_data", "img", "revolt-logo.png") )

    tray.on("click", () => {
        win.show();
    })

    var contextMenu;

    if (process.platform == "linux") {
      Logger.log('main_window', 'On Linux, system tray should have an Open option.')
      contextMenu = Menu.buildFromTemplate([
        { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "mw_data", "img", "revolt-logo-16.png")},
        { type: 'separator'},
        { type: 'normal', label: 'Open', click: linux_open},
        { type: 'separator' },
        { label: 'Revolt Website', type: 'normal', click: openwebsite},
        { type: 'separator' },
        { label: 'Quit', type: 'normal', role: "quit" },
      ])
    } else {
      Logger.log('main_window', 'On Windows, system tray should NOT have an Open option.')
      contextMenu = Menu.buildFromTemplate([
        { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "mw_data", "img", "revolt-logo-16.png")},
        { type: 'separator'},
        { label: 'Revolt Website', type: 'normal', click: openwebsite},
        { type: 'separator' },
        { label: 'Quit', type: 'normal', role: "quit" },
      ])
    }
    
    tray.setToolTip('Revolt')
    tray.setContextMenu(contextMenu)

  })

