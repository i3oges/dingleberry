const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./auth').discord
const winston = require('winston')
const { URL } = require('url')
const commands = require('./commands/')
const commandRegex = /^(?:\/)\w+/
let joinedVoiceChannel = ''
let lastMeme = ''
let msg = ''
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
    args = message.content.split(commandRegex)[1].trim() // everything after the command
    let channel = message.channel
    winston.info(`command: ${command}, args: ${args}`)

    switch (command.replace('/', '')) {
      case 'meme':
        lastMeme = args
        msg = await commands.meme.get(args)
        await commands.meme.announce(channel, msg)
        break
      case 'playme':
        if (args) {
          let url = new URL(args)
          if (/youtu\.?be/.test(url.host)) {
            joinedVoiceChannel = await commands.playme(message)
          } else {
            winston.info(`${message} wasn't supported`)
            channel.send(`${message.author} sorry! I only support youtube links for now.`)
          }
        } else {
          channel.send(`${message.author} please supply a youtube url for me to play`)
        }
        break
      case 'stop':
        if (joinedVoiceChannel) {
          joinedVoiceChannel.leave()
        }
        break
      case 'more':
        msg = await commands.meme.get(lastMeme)
        await commands.meme.announce(channel, m)
        break
      case 'ping':
        channel.send(`${message.author} pong! I've been alive for ${commands.ping()}`)
        break
      case 'roll':
        let rollArgs = args || '1d20'
        let output = `\`\`\`\n` // begin block quote
        winston.info(`${message.author} requested a roll (${rollArgs})`)

        let finishedRoll = commands.roll(rollArgs) // do the roll(s)
        winston.info(finishedRoll)
        for (let i = 0; i < finishedRoll.results.length; i++) {
          output += `\nDie ${i}: ${finishedRoll.results[i]}/${finishedRoll.faces}` // Each roll
        }
        output += `\n${finishedRoll.message}: ${finishedRoll.sum} \`\`\`` // "Rolled" or a custom message + sum + end blockquote

        channel.send(output)
        break
      default:
        channel.send(`The command ${command} wasn't recognized`)
    }
  }
})

client.login(token)
