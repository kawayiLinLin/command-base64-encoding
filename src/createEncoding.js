const { isFunction } = require("../utils")
const { inputHandler, outputHandler } = require("./inputOutputHandler")

const encodingMap = require('../config').getEncodingMap()

/**
 *
 * @param {*} options 编码参数
 */
async function initEncoding(options) {
  const { type: encodingType, input: encodingInput, output: encodingOutput } = options
  const encodingRequire = encodingMap.get(encodingType)

  if (isFunction(encodingRequire)) {
    const { encode } = encodingRequire()

    const result = encode(await inputHandler(encodingInput), options)

    outputHandler(encodingOutput, result)
    
    return
  }
  throw new Error(`error encoding type: ${encodingType}`)
}

module.exports = initEncoding
