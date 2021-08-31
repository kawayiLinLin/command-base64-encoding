const { Command } = require("commander")
const createEncoding = require("./createEncoding")
const createDecoding = require('./createDecoding')
const { isString, isBoolean } = require("../utils")
const fs = require("fs").promises

const program = new Command()

const packageJSON = require("../package.json")

function initVersion() {
  program.version(packageJSON.version)
}

function initCommand() {}

function initOptions() {
  program
    .command("encode")
    .option(
      "-t, --type [encoding type]",
      "in what encoding type",
      "base64",
    )
    .option("-i --input <encoding input>", "encoding input file path or text")
    .option(
      "-o --output <encoding output>",
      "encoding output file path or 'console'",
      "console"
    ).option(
      '-w --with-mimetype',
      'add data URL scheme'
    ).action((options) => {
      initCommandHandlers(options, 'encode')
    })
  program
    .command("decode")
    .option(
      "-t, --type [decoding type]",
      "in what decoding type",
      "base64"
    )
    .option("-i --input <decoding input>", "decoding input file path or text")
    .option(
      "-o --output <decoding output>",
      "decoding output file path or 'console'",
      "console"
    ).action((options) => {
      initCommandHandlers(options, 'decode')
    })

  program.parse()
}

function optionsHandler(options) {
  if (isBoolean(options.encode)) {
    options
  }
}

async function initCommandHandlers(options, command) {
  if (command === 'encode')
    createEncoding(options.type, options.input, options.output, options.withMimetype)
  else if (command === 'decode')
    createDecoding(options.type, options.input, options.output)
}

module.exports = {
  initVersion,
  initOptions,
  initCommandHandlers,
}
