const { isFunction, resolvePath } = require("../utils")
const { inputHandler, outputHandler } = require("./inputOutputHandler")
const fs = require("fs").promises

const path = require("path")

const mime = require("mime")

const encodingMap = new Map([["base64", () => require("../lib/base64")]])

/**
 *
 * @param {*} encodingType 编码方式
 * @param {*} encodingInput 编码输入
 * @param {*} encodingOutput 编码输出
 */
async function initEncoding(
  encodingType,
  encodingInput,
  encodingOutput,
  withMimetype
) {
  const encodingRequire = encodingMap.get(encodingType)

  if (encodingRequire && isFunction(encodingRequire)) {
    const { encode } = encodingRequire()
    const mimeType = mime.getType(path.extname(encodingInput))
    const mimeTypeShowed =
      withMimetype && mimeType
        ? `data:${mimeType};base64,`
        : (console.warn("warning: only file needs the '--with-mimetype' option"), "")
    const result =
      mimeTypeShowed + encode(await inputHandler(encodingInput, withMimetype))

    outputHandler(encodingOutput, result)
    return
  }
  throw new Error(`error encoding type: ${encodingType}`)
}

module.exports = initEncoding
