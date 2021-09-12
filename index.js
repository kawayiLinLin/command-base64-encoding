const config = require('./config')

const commandBase64Encoding = Object.create(null)

const decodingList = config.getDecodingList("array")

const encodingList = config.getEncodingList("array")

decodingList.forEach(decodingItem => {
    if (!commandBase64Encoding[decodingItem]) {
        commandBase64Encoding[decodingItem] = Object.create(null)
    }
    
    commandBase64Encoding[decodingItem].decoding = require(`./lib/${decodingItem}`).decode
})

encodingList.forEach(encodingItem => {
    if (!commandBase64Encoding[encodingItem]) { 
        commandBase64Encoding[encodingItem] = Object.create(null)
    }

    commandBase64Encoding[encodingItem].encoding = require(`./lib/${encodingItem}`).encode
})

module.exports = commandBase64Encoding
