"use strict";

var remote = require("electron").remote;

var Menua = require('electron').Menu

var ipcRenderer = require("electron").ipcRenderer;

var browserWindow = require("electron").BrowserWindow;


const path = require("path")

const menu = new remote.Menu();
const Config = require(path.join(__dirname, "../", "../", "common", "Configuration"))

const customTitlebar = require('custom-electron-titlebar');

var titlebar;

function load() {

    if (Config.Config_Get("version_switch") == "nightly") {
        document.getElementById("app").innerHTML += `
        <div class="nightly-notice">
        <div class="nightly-notice-text">
          You're using the Nightly Client. This may have more bugs than Stable.
        </div>
        <div class="nightly-notice-x" onclick="document.getElementsByClassName('nightly-notice')[0].remove()">
          X
        </div>
      </div>`
      document.getElementById('app').innerHTML += `<webview id="webview" src="https://nightly.revolt.chat"></webview>`
    } else {
        document.getElementById('app').innerHTML += `<webview id="webview" src="https://app.revolt.chat"></webview>`
    }
    


    menu.append(new remote.MenuItem({
        label: '',
        submenu: [{
            label: 'Settings',
            click: () => ipcRenderer.send("settings-window")
        }, {
            label: 'Quit',
            click: () => ipcRenderer.send("appQuit")
        }]
    }));
    
    if (process.platform != "linux" || Config.Config_Get("linux_top_bar_toggle") ) {
        
        titlebar = new customTitlebar.Titlebar({
            backgroundColor: customTitlebar.Color.fromHex(Config.Config_Get("global_top_bar_hex")),
            hideWhenClickingClose: true,
            menu: menu,
        });
    
        
    
        titlebar.updateMenuPosition('right');
    }
    
    var webview = document.getElementById("webview");
    
    
    webview.addEventListener('new-window', (e) => {
        e.preventDefault();
        require('electron').shell.openExternal(e.url)
    })
    
    /*let env = process.env.NODE_ENV || 'development'
    
    if (env == 'development') {
        webview.addEventListener("dom-ready", function(){ webview.openDevTools(); });
    }
    */
    ipcRenderer.on('reload_main', () => {
        console.log("Reloading...")
        location.reload()
    })
    
    ipcRenderer.on('change_bg', (e, colorHex) => {
        titlebar.updateBackground(colorHex)
        //document.getElementsByClassName("titlebar")[0].style.backgroundColor = "transition: background-color 1s ease; background-color: " + colorHex + ";";
    })
    
    
}
