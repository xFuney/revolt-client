const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')

console.log("Loading main window...")

var win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
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
    require('electron').shell.openExternal("https://revolt.chat")
}

app.whenReady().then(() => {
    tray = new Tray( path.join(__dirname, "mw_data", "img", "revolt-logo.png") )

    tray.on("click", () => {
        win.show();
    })

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "mw_data", "img", "revolt-logo-16.png")},
      { type: 'separator'},
      { label: 'Revolt Website', type: 'normal', click: openwebsite},
      { type: 'separator' },
      { label: 'Quit', type: 'normal', role: "quit" },
    ])
    tray.setToolTip('Revolt')
    tray.setContextMenu(contextMenu)

    let wc = win.webContents
    wc.on('will-navigate', function (e, url) {
      if (url != wc.getURL()) {
        e.preventDefault()
        electron.shell.openExternal(url)
      }
    })

  })

