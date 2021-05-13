var remote = require("electron").remote;

var Menua = require('electron').Menu

var ipcRenderer = require("electron").ipcRenderer;

var browserWindow = require("electron").BrowserWindow;

const path = require("path")

const menu = new remote.Menu();
const Config = require(path.join(__dirname, "../", "../", "common", "Configuration"))

const customTitlebar = require('custom-electron-titlebar');

var titlebar;

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
webview.addEventListener("dom-ready", function(){ webview.openDevTools(); });
