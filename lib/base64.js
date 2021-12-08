const mime = require('mime')
const path = require('path')

const { createCharIndexMap, isString } = require('../utils')

const { createEncodingBaseInt, createDecodingBaseInt } = require('./createBaseIntEncoding')

/**
 * base64 编码表
 */
const base64Str = require('../config').getEncodingChars("base64")

const base64decodeMap = createCharIndexMap(base64Str)

const isDataUrlSchemeReg = /^data:(.+\/.+);base64,/

module.exports = {
  encode: (input, options = { input: "", withMimetype: false }) => {
    const encode = createEncodingBaseInt(64, base64Str)
    const { input: encodingInput, withMimetype } = options
    const mimeType = mime.getType(path.extname(encodingInput))

    /** base64 mine type */
    let mimeTypeShowed =
      withMimetype && mimeType
        ? `data:${mimeType};base64,`
        : (/*console.warn("warning: only file needs the '--with-mimetype' option")*/void 0, "")

    if (!mimeTypeShowed) {
      console.warn("warning: only file needs the '--with-mimetype' option")
      console.warn("usage: use 'ce encode mime-type-list' to show which kinds of file is supported")
      mimeTypeShowed = ""
    }
    const result = mimeTypeShowed + encode(input)
    return result
  },
  decode: (input, options = { output: "" }) => {
    const decode = createDecodingBaseInt(64, base64decodeMap)
    const { output: decodingOutput } = options

    if (!isString(input)) input = Buffer.from(input).toString()

    if (decodingOutput !== 'console') {
      let extname = path.extname(decodingOutput)
      if (isString(extname)) extname = extname.replace('.', '')

      if (isDataUrlSchemeReg.test(input)) {
        const [prefix, mimetype] = input.match(isDataUrlSchemeReg)

        if (mimetype && extname === mime.getExtension(mimetype)) {
          input = input.replace(prefix, '')
        } else {
          throw new Error('unsupport mimetype')
        }
      }
    }
    let result = decode(input)
    return result
  }
}
