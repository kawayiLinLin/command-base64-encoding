#! /usr/bin/env node
const command = require('../src/initCommand')

command.initVersion()

command.initOptions()

command.initCommandHandlers()