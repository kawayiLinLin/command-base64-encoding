const { isFunction, resolvePath } = require("../utils")
const fs = require("fs").promises
const path = require('path')

const mime = require('mime')

async function inputHandler(encodingInput) {
  try {
    const result = await fs.readFile(resolvePath(encodingInput))
    console.log(mime.getType(path.extname(encodingInput)))
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

module.exports = {
  inputHandler,
  outputHandler,
}
