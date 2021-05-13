const version_info = require('../app/version_info')

const APP_ID = "com.revolt.revolt-client"
const APP_VERSION_STRING = `${version_info.APP_NAME} ${version_info.VERSION}-${version_info.BRANCH}`

module.exports = {
    APP_ID,
    APP_VERSION_STRING
}