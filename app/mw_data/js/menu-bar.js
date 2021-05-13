var remote = require("electron").remote;

var ipcRenderer = require("electron").ipcRenderer;

var browserWindow = require("electron").BrowserWindow;

const menu = new remote.Menu();

const customTitlebar = require('custom-electron-titlebar');


let titlebar = new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#202020'),
    hideWhenClickingClose: true,
    menu: menu
});

