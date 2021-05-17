"use strict";

const ipc = require('electron').ipcMain;

const { app } = require('electron');

const Logger = require('../common/Logging')
const Config = require('../common/Configuration')

const settings = require('./settings_window')

ipc.on('settings-window', () => {
    Logger.log('ipc', 'Opening settings window...')
    settings.create()
})

ipc.on('settings_restart', () => {
    Logger.log('ipc', 'Settings has invoked an IPC relaunch. Relaunching...')
    app.relaunch()
    app.exit()
})

ipc.on('reload_main', () => {
    Logger.log('ipc', 'Settings has invoked a main renderer reload. Sending this to main renderer.')
    global.win.webContents.send('reload_main')
})

ipc.on('change_bg', (e, newBg) => {
    Logger.log('ipc', 'Setting has invoked a main renderer titlebar color change. Sending this to main renderer...')
    console.log(newBg)
    global.win.webContents.send('change_bg', newBg)
})