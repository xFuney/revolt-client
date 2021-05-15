var remote = require("electron").remote;

var Menua = require('electron').Menu

var ipcRenderer = require("electron").ipcRenderer;

var browserWindow = require("electron").BrowserWindow;

const path = require("path")

const menu = new remote.Menu();
const Config = require(path.join(__dirname, "../", "../", "common", "Configuration"))

var topbar_toggle = Config.Config_Get("linux_top_bar_toggle")
var config_tbhex = Config.Config_Get('global_top_bar_hex')
var winsize_toggle = Config.Config_Get("minimum_window_size_toggle")

function loaded() {
    document.getElementById("linux-wm-checkbox").checked = Config.Config_Get("linux_top_bar_toggle")
    document.getElementById("min-winsize-checkbox").checked = Config.Config_Get("minimum_window_size_toggle")
    document.getElementById("topbar-hex-input").value = Config.Config_Get("global_top_bar_hex")
}

function save() {
    Config.Config_Set("linux_top_bar_toggle", document.getElementById("linux-wm-checkbox").checked)
    Config.Config_Set("minimum_window_size_toggle", document.getElementById("min-winsize-checkbox").checked)
    Config.Config_Set("global_top_bar_hex", document.getElementById("topbar-hex-input").value)

    if (document.getElementById("linux-wm-checkbox").checked != topbar_toggle) {
        ipcRenderer.send("settings_restart")
    }

    if (document.getElementById("min-winsize-checkbox").checked != winsize_toggle) {
        ipcRenderer.send("settings_restart")
    }

    if (document.getElementById("topbar-hex-input").value != config_tbhex) {
        console.log('main reload')
        ipcRenderer.send('change_bg', document.getElementById("topbar-hex-input").value)
        config_tbhex = document.getElementById("topbar-hex-input").value 
    }

    //alert("Saved OK")
    document.getElementById("settings-footer").innerHTML = `<p style="color: #00AA00;">Saved successfully. To apply new colour to the menu bar, click on the main window.</p>`

    setTimeout( () => {
        document.getElementById("settings-footer").innerHTML = "";
    }, 3000)
    
    // <p style="color: #AA0000;">Saving failed. Please check the settings you are trying to apply.</p>
}

function reset() {
    alert("Reset")
}