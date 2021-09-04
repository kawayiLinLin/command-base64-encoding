const { createCharIndexMap } = require('../utils')

const { createEncodingBaseInt, createDeCodingBaseInt } = require('./createBaseIntEncoding')

/**
 * base64 编码表
 */
const base64Str = require('../config').getEncodingChars("base64")

const base64decodeMap = createCharIndexMap(base64Str)


module.exports = {
  encode: createEncodingBaseInt(64, base64Str),
  decode: createDeCodingBaseInt(64, base64decodeMap),
}
