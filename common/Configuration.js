let config = {
    linux_top_bar_toggle: false,
    global_top_bar_hex: "#202020",
    minimum_window_size_toggle: true,
    version_switch: "stable",
    dev_mode: false
}

const fs = require("fs")
const path = require('path')

let configDir = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

if (fs.existsSync(path.join(configDir, "/revolt_config.json"))) {
    config = require(path.join(configDir, "/revolt_config.json"))
} else {
    fs.writeFileSync(path.join(configDir, "/revolt_config.json"), JSON.stringify(config))
}

module.exports.Config_Get = function(key) {
    return config[key]
}

module.exports.Config_Set = function(key, val) {

    config[key] = val

    fs.writeFileSync(path.join(configDir, "/revolt_config.json"), JSON.stringify(config))

}

module.exports.Config_Reset = function() {
    config = {
        linux_top_bar_toggle: false,
        global_top_bar_hex: "#202020",
        minimum_window_size_toggle: true,
        version_switch: "stable",
        dev_mode: false
    }

    fs.writeFileSync(path.join(configDir, "/revolt_config.json"), JSON.stringify(config))
}