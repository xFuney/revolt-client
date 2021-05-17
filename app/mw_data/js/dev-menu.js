"use strict";
//const Config = require(path.join(__dirname, "../", "../", "common", "Configuration"))

var open = false;
var procmon_open = false;

if (Config.Config_Get("dev_mode")) {
    document.getElementById("app").innerHTML += `
    <div class="devmode-performance" style="display:none;" id="dm-perf">
    <div class="dm-p-table">
      <table>
        <tbody id="table-dm-p">
          
        </tbody>

        
      </table>
    </div>
  </div>
    <div class="devmode-watermark" onclick="oclose();">
    DEVELOPER MODE
  </div>
  <div class="devmode-options" id="d-opt" >
    <button onclick="open_wvdt();">Open WebView DevTools</button>
    <button onclick="procmon_oclose();">Toggle Process Monitor</button>
    <button onclick="client_restart();">Restart Client</button>
    <button onclick="client_reload();">Reload Client</button>
    <button class="last-button" onclick="settings_reset();">Reset All Settings</button>
  </div>
    `

    ipcRenderer.on('metrics_update', (e, d) => {
        let ft = `<tr>
        <th>PID</th>
        <th>TYPE</th>
        <th>CREATE</th>
        <th>CPU</th>
        <th>MEM</th>
      </tr>`;
    
        for (const i in d) {
            ft += `
            <tr>
                    <td>${d[i].pid}</td>
                    <td>${d[i].type}</td>
                    <td>${moment.unix(d[i].creationTime.toFixed()/1000).format("DD/MM/YYYY HH:mm:ss")}</td>
                    <td>${d[i].cpu.percentCPUUsage.toFixed(2)}%</td>
                    <td>${(d[i].memory.workingSetSize/1000).toFixed()}M</td>
            </tr>
            `
        }
      
        document.getElementById('table-dm-p').innerHTML = ft
    })
    
}

function oclose() {
    if (!open) {
        //document.getElementById('d-opt').style.display = "flex";
        document.getElementById('d-opt').classList.add("devmode-options-focused")
        document.getElementById('d-opt').classList.remove("devmode-options")
        open = true
    } else {
        document.getElementById('d-opt').classList.remove("devmode-options-focused")
        document.getElementById('d-opt').classList.add("devmode-options")
        open = false
    }
}

function procmon_oclose() {
    if (!procmon_open) {
        document.getElementById("dm-perf").style.display = "block";
        procmon_open = true
    } else {
        document.getElementById("dm-perf").style.display = "none";
        procmon_open = false
    }
}

function open_wvdt() {
    document.getElementById("webview").openDevTools();
}

function client_restart() {
    ipcRenderer.send("settings_restart")
}

function client_reload() {
    ipcRenderer.send("reload_main")
}

function settings_reset() {
    Config.Config_Reset()
    ipcRenderer.send("settings_restart")
}
