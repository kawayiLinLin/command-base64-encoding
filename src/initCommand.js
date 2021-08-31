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
    .command("e")
    .option(
      "-t, --type [encoding or decoding type]",
      "in what encoding or decoding type",
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
      initCommandHandlers(options, 'e')
    })
  program
    .command("d")
    .option(
      "-t, --type [encoding or decoding type]",
      "in what encoding or decoding type",
      "base64"
    )
    .option("-i --input <encoding input>", "encoding input file path or text")
    .option(
      "-o --output <encoding output>",
      "encoding output file path or 'console'",
      "console"
    ).action((options) => {
      initCommandHandlers(options, 'd')
    })

  program.parse()
}

function optionsHandler(options) {
  if (isBoolean(options.encode)) {
    options
  }
}

async function initCommandHandlers(options, command) {
  if (command === 'e')
    createEncoding(options.type, options.input, options.output, options.withMimetype)
  else if (command === 'd')
    createDecoding(options.type, options.input, options.output)
}

module.exports = {
  initVersion,
  initOptions,
  initCommandHandlers,
}
