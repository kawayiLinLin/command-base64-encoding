#! /usr/bin/env node
const { Command } = require("commander")
const program = new Command()
const command = require("../src/initCommand")

command.initVersion(program).initOptions(program)
