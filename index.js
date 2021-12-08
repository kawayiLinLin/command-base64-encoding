const config = require('./config')

const commandEncoding = Object.create(null)

const decodingList = config.getDecodingList("array")

const encodingList = config.getEncodingList("array")

decodingList.forEach(decodingItem => {
    if (!commandEncoding[decodingItem]) {
        commandEncoding[decodingItem] = Object.create(null)
    }
    
    commandEncoding[decodingItem].decoding = require(`./lib/${decodingItem}`).decode
})

encodingList.forEach(encodingItem => {
    if (!commandEncoding[encodingItem]) { 
        commandEncoding[encodingItem] = Object.create(null)
    }

    commandEncoding[encodingItem].encoding = require(`./lib/${encodingItem}`).encode
})

module.exports = commandEncoding
