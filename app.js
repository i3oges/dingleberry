const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('~/auth').discord
let joinedVoiceChannel = ''
let lastMeme = ''

const playme = require('~/commands/playme')
const meme = require('~/commands/meme')

client.on('ready', async () => {
  console.log('I am ready')
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
  channel.send(`Welcome to the server, ${member}`)
})

client.on('message', async function (message) {
  // messages starting with '/' are commands
  if (message.content[0] === '/') {
    command = message.content.split(' ')[0].replace('/', '')
    switch (command) {
      case 'meme':
        lastMeme = message
        meme(message)
        break
      case 'playme':
        joinedVoiceChannel = await playme(message)
        break
      case 'stop':
        joinedVoiceChannel.leave()
        break
      case 'more':
        meme(lastMeme)
    }
  }
})

client.login(token)
