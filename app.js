const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./auth').discord
const winston = require('winston')
const { URL } = require('url')
const commands = require('./commands/')
const commandRegex = /^(?:\/)\w+/
let joinedVoiceChannel = ''
let lastMeme = ''

winston.add(winston.transports.File, { filename: './debug.log' })

client.on('ready', async () => {
  winston.info('Ready to serve')
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`)

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log')
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  winston.info(`Welcoming ${member}`)
  channel.send(`Welcome to the server, ${member}`)
})

client.on('message', async function (message) {
  // messages starting with '/' are commands
  if (commandRegex.test(message.content)) {
    command = message.content.match(commandRegex)[0]
    args = message.content.split(commandRegex)[1].trim()

    winston.info(`command: ${command}, args: ${args}`)

    switch (command.replace('/', '')) {
      case 'meme':
        lastMeme = message
        commands.meme(message)
        break
      case 'playme':
        if (args) {
          let url = new URL(args)
          if (/youtu\.?be/.test(url.host)) {
            joinedVoiceChannel = await commands.playme(message)
          } else {
            winston.info(`${message} wasn't supported`)
            message.channel.send(`${message.author} sorry! I only support youtube links for now.`)
          }
        } else {
          message.channel.send(`${message.author} please supply a youtube url for me to play`)
        }
        break
      case 'stop':
        if (joinedVoiceChannel) {
          joinedVoiceChannel.leave()
        }
        break
      case 'more':
        commands.meme(lastMeme)
        break
      case 'ping':
        message.channel.send(`${message.author} pong! I've been alive for ${commands.ping()}`)
        break
      case 'roll':
        let roll = args || '1d20'

        winston.info(`${message.author} requested a roll (${roll})`)

        let dRoll = commands.roll(roll)
        message.channel.send(dRoll)
      default:
        message.channel.send(`The command ${command} wasn't recognized`)
    }
  }
})

client.login(token)
