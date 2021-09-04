const commandHandler = require('./command')
const configHandler = require('../config')

const config = configHandler.getConfig()


const packageJSON = require("../package.json")

function initVersion(program) {
  program.version(packageJSON.version)
  return module.exports
}

function initOptions(program) {
  const { commands } = config

  commands.forEach(command => {
    const registeredCommand = program.command(command.commandName)

    const { commandOptions } = command

    commandOptions.forEach(option => {
      const args = []
      const optionName = []
      if (option.shortName) {
        optionName.push(`-${option.shortName},`)
      }
      if (option.fullName) {
        optionName.push(`--${option.fullName}`)
      }
      if (option.paramsName) {
        const isOptionalTag = option.optional ? ['<', '>'] : ['[', ']']
        optionName.push(`${isOptionalTag[0]}${option.paramsName}${isOptionalTag[1]}`)
      }
      if (optionName.length) {
        args.push(optionName.join(' '))
      }
      if (option.description) {
        args.push(option.description)
      }
      if (option.defaultValue) {
        args.push(option.defaultValue)
      }
      registeredCommand.option(...args)
    })

    registeredCommand.action(options => {
      if (!command.originCommandName in commandHandler) {
        throw Error('no such command: ' + command.commandName)
      }
      commandHandler[command.originCommandName](options)
    })
  })

  program.parse()
  return module.exports
}

module.exports = {
  initVersion,
  initOptions,
}
