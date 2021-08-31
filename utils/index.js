const fs = require('fs').promises
const path = require('path')

function isFunction(val) {
    return typeof val === 'function'
}

function isString(val) {
    return typeof val === 'string'
}

function isBoolean(val) {
    return typeof val === 'boolean'
}

function resolvePath(inputPath) {
    return path.resolve(process.cwd(), inputPath)
}

function createCharIndexMap(str) {
    const map = new Map()
    if (!isString(str)) return map
    for (let i = 0; i < str.length; i ++) {
        map.set(str[i], i)
    }
    return map
}

module.exports = {
    isFunction,
    resolvePath,
    isString,
    isBoolean,
    createCharIndexMap
}