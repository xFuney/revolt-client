const version_info = require('../app/version_info')

module.exports.log = function(modType, sText) {
    console.log(`[${version_info.APP_NAME}] (${modType}) ${sText}`)
}