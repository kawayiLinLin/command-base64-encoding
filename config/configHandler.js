const config = require('./config.json')
const path = require('path')

const fs = require("fs").promises

const encodingMap = new Map(
    config.encodingTypes.map(type => [type.name, () => require(`../lib/${type.name}`)])
)

module.exports = {
    getConfig() {
        return config
    },
    async setConfig(config) {
        await fs.writeFile(path.resolve(__dirname, './config.json'), JSON.stringify(config))
    },
    getEncodingMap() {
        return encodingMap
    },
    getEncodingChars(type) {
        const encodingType = config.encodingTypes.find(t => t.name === type)
        if (!encodingType) throw new Error('error: no such ' + type)
        return encodingType.chars
    },
    getEncodingList() {
        return config.encodingTypes.filter(type => type.allow.includes("encode")).map(type => type.name).join('\n')
    },
    getDecodingList() {
        return config.encodingTypes.filter(type => type.allow.includes("decode")).map(type => type.name).join('\n')
    }
}