
const createEncoding = require("./createEncoding")
const createDecoding = require('./createDecoding')
const config = require('../config')

module.exports = {
    encode: createEncoding,
    decode: createDecoding,
    'encode-list': () => {
        console.log(config.getEncodingList())
    },
    'decode-list': () => {
        console.log(config.getDecodingList())
    }
}