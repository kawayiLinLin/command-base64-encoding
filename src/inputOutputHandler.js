const { resolvePath } = require("../utils")
const fs = require("fs").promises


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
    process.stdout.write(data)
    process.stdout.write('\n')
  } else {
    await fs.writeFile(resolvePath(encodingOutput), data)
  }
}

module.exports = {
  inputHandler,
  outputHandler,
}
