const { app, Menu, Tray, BrowserWindow } = require("electron")
const Logger = require('../../common/Logging')
const Config = require('../../common/Configuration')

const path = require("path")

module.exports.init = function(win, WindowIcon) {
    
    function openwebsite() {
        Logger.log('tray', 'App tray website option selected, opening Revolt site in browser...')
          require('electron').shell.openExternal("https://revolt.chat")
      }
      
      function linux_open() {
        win.show()
      }
      
      function settings_open() {
        Logger.log('tray', 'Creating settings window...')
        win = new BrowserWindow({
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
      
        win.setMenuBarVisibility(false)
        win.loadFile(path.join(__dirname, "../", "mw_data", "settings.html"))
      }

      app.whenReady().then(() => {
        Logger.log('tray', 'App ready, initialising tray...')
          tray = new Tray( path.join(__dirname, "tray_images", "revolt-logo.png") )
      
          tray.on("click", () => {
              win.show();
          })
      
          var contextMenu;
      
          if (process.platform == "linux") {
            Logger.log('tray', 'On Linux, system tray should have an Open and Settings option.')
            contextMenu = Menu.buildFromTemplate([
              { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "tray_images", "revolt-logo-16.png")},
              { type: 'separator'},
              { type: 'normal', label: 'Open', click: linux_open},
              { type: 'normal', label: 'Settings', click: settings_open},
              { type: 'separator' },
              { label: 'Revolt Website', type: 'normal', click: openwebsite},
              { type: 'separator' },
              { label: 'Quit', type: 'normal', role: "quit" },
            ])
          } else {
            Logger.log('tray', 'On Windows, system tray should NOT have an Open option.')
            contextMenu = Menu.buildFromTemplate([
              { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "tray_images", "revolt-logo-16.png")},
              { type: 'separator'},
              { label: 'Revolt Website', type: 'normal', click: openwebsite},
              { type: 'separator' },
              { label: 'Quit', type: 'normal', role: "quit" },
            ])
          }
          
          tray.setToolTip('Revolt')
          tray.setContextMenu(contextMenu)
      
        })
}