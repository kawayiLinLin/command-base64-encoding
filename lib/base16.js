const { createCharIndexMap } = require('../utils')

const { createEncodingBaseInt, createDeCodingBaseInt } = require('./createBaseIntEncoding')

/**
 * base16 编码表
 */
const base16Str = require('../config').getEncodingChars("base16")

const base16decodeMap = createCharIndexMap(base16Str)


module.exports = {
  encode: createEncodingBaseInt(16, base16Str),
  decode: createDeCodingBaseInt(16, base16decodeMap),
}
