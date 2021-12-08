const { createCharIndexMap } = require('../utils')

const { createEncodingBaseInt, createDecodingBaseInt } = require('./createBaseIntEncoding')

/**
 * base32 编码表
 */
const base32Str = require('../config').getEncodingChars("base32")

const base32decodeMap = createCharIndexMap(base32Str)


module.exports = {
  encode: createEncodingBaseInt(32, base32Str),
  decode: createDecodingBaseInt(32, base32decodeMap),
}
