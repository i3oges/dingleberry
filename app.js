const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./auth').discord
const winston = require('winston')
const { URL } = require('url')
const commands = require('./commands/')

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
  if (message.content[0] === '/') {
    command = message.content.split(' ')[0].replace('/', '')
    switch (command) {
      case 'meme':
        lastMeme = message
        commands.meme(message)
        break
      case 'playme':
        let url = new URL(message.content.split(' ')[1])
        if (/youtu\.?be/.test(url.host)) {
          joinedVoiceChannel = await commands.playme(message)
        } else {
          winston.info(`${message} wasn't supported`)
          message.channel.send(`${message.author} sorry! I only support youtube links for now.`)
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
    }
  }
})

client.login(token)
