const { isFunction, resolvePath } = require("../utils")
const { inputHandler, outputHandler } = require('./inputOutputHandler')
const fs = require("fs").promises

const decodingMap = new Map([["base64", () => require("../lib/base64")]])

/**
 *
 * @param {*} decodingType 编码方式
 * @param {*} decodingInput 编码输入
 * @param {*} decodingOutput 编码输出
 */
async function initDecoding(decodingType, decodingInput, decodingOutput) {
  const decodingRequire = decodingMap.get(decodingType)

  if (decodingRequire && isFunction(decodingRequire)) {
    const { decode } = decodingRequire()
    const result = decode(await inputHandler(decodingInput))

    outputHandler(decodingOutput, result)
    return
  }
  throw new Error(`error dncoding type: ${decodingType}`)
}

module.exports = initDecoding
