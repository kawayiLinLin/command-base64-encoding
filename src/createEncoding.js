const { isFunction, resolvePath } = require("../utils")
const { inputHandler, outputHandler } = require('./inputOutputHandler')
const fs = require("fs").promises

const encodingMap = new Map([["base64", () => require("../lib/base64")]])

/**
 *
 * @param {*} encodingType 编码方式
 * @param {*} encodingInput 编码输入
 * @param {*} encodingOutput 编码输出
 */
async function initEncoding(encodingType, encodingInput, encodingOutput) {
  const encodingRequire = encodingMap.get(encodingType)

  if (encodingRequire && isFunction(encodingRequire)) {
    const { encode } = encodingRequire()
    const result = encode(await inputHandler(encodingInput))

    outputHandler(encodingOutput, result)
    return
  }
  throw new Error(`error encoding type: ${encodingType}`)
}

module.exports = initEncoding
