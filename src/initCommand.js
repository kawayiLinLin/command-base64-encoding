const { Command } = require("commander");
const createEncoding = require('./createEncoding')
const fs = require('fs').promises

const program = new Command()

const packageJSON = require("../package.json")

function initVersion() {
  program.version(packageJSON.version)
}

function initOptions() {
  program
    .option("-e, --encode <encoding type>", "in what encoding type", 'base64')
    .option("-i --input <encoding input>", "encoding input file path or text")
    .option('-o --output <encoding output>', "encoding output file path or 'console'", "console")
    .parse()
}

async function initCommandHandlers() {
    const options = program.opts()
    createEncoding(options.encode, options.input, options.output)
}

module.exports = {
  initVersion,
  initOptions,
  initCommandHandlers,
};
