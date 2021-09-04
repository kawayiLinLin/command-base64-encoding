const { isFunction } = require("../utils")
const { inputHandler, outputHandler } = require("./inputOutputHandler")

const path = require("path")

const mime = require("mime")

const encodingMap = require('../config').getEncodingMap()

/**
 *
 * @param {*} encodingType 编码方式
 * @param {*} encodingInput 编码输入
 * @param {*} encodingOutput 编码输出
 */
async function initEncoding(options) {
  const { type: encodingType, input: encodingInput, output: encodingOutput, withMimetype } = options
  const encodingRequire = encodingMap.get(encodingType)

  if (encodingRequire && isFunction(encodingRequire)) {
    const { encode } = encodingRequire()
    const mimeType = mime.getType(path.extname(encodingInput))

    /** base64 mine type */
    let mimeTypeShowed =
      withMimetype && mimeType
        ? `data:${mimeType};base64,`
        : (console.warn("warning: only file needs the '--with-mimetype' option"), "")

    if (mimeTypeShowed && encodingType !== "base64") {
      console.warn("warning: only base64 needs the '--with-mimetype' option")
      mimeTypeShowed = ""
    }

    const result =
      mimeTypeShowed + encode(await inputHandler(encodingInput, withMimetype))

    outputHandler(encodingOutput, result)
    return
  }
  throw new Error(`error encoding type: ${encodingType}`)
}

module.exports = initEncoding
