const { isFunction } = require("../utils")
const { inputHandler, outputHandler } = require('./inputOutputHandler')

const decodingMap = require('../config').getEncodingMap()

/**
 *
 * @param {*} options 解码参数
 */
async function initDecoding(options) {
  const { type: decodingType, input: decodingInput, output: decodingOutput } = options
  const decodingRequire = decodingMap.get(decodingType)

  if (isFunction(decodingRequire)) {
    const { decode } = decodingRequire()
    const result = decode(await inputHandler(decodingInput), options)

    outputHandler(decodingOutput, result)
    
    return
  }
  throw new Error(`error decoding type: ${decodingType}`)
}

module.exports = initDecoding
