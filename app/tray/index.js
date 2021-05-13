const { app, Menu, Tray } = require("electron")
const Logger = require('../../common/Logging')

const path = require("path")

module.exports.init = function(win) {
    
    function openwebsite() {
        Logger.log('main_window', 'App tray website option selected, opening Revolt site in browser...')
          require('electron').shell.openExternal("https://revolt.chat")
      }
      
      function linux_open() {
        win.show()
      }
      
      app.whenReady().then(() => {
        Logger.log('main_window', 'App ready, initialising tray...')
          tray = new Tray( path.join(__dirname, "tray_images", "revolt-logo.png") )
      
          tray.on("click", () => {
              win.show();
          })
      
          var contextMenu;
      
          if (process.platform == "linux") {
            Logger.log('main_window', 'On Linux, system tray should have an Open option.')
            contextMenu = Menu.buildFromTemplate([
              { label: 'Revolt Client', enabled: false, icon: path.join(__dirname, "tray_images", "revolt-logo-16.png")},
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