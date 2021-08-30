const { isFunction, resolvePath } = require("../utils")
const fs = require("fs").promises

const encodingMap = new Map([["base64", () => require("../lib/base64")]])

async function inputHandler(encodingInput) {
  try {
    const result = await fs.readFile(resolvePath(encodingInput))
    return result
  } catch {
    return encodingInput
  }
}

async function outputHandler(encodingOutput, data) {
  if (encodingOutput === "console") {
    console.log(data)
  } else {
    await fs.writeFile(resolvePath(encodingOutput), data)
  }
}
/**
 *
 * @param {*} encodingType 编码方式
 * @param {*} encodingInput 编码输入
 * @param {*} encodingOutput 编码输出
 */
async function initEncoding(encodingType, encodingInput, encodingOutput) {
  const encodingRequire = encodingMap.get(encodingType)

  if (encodingRequire && isFunction(encodingRequire)) {
    const { encode } = encodingRequire();
    const result = encode(await inputHandler(encodingInput))

    outputHandler(encodingOutput, result)
    return;
  }
  throw new Error(`error encoding type: ${encodingType}`)
}

module.exports = initEncoding;
