const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./auth.js').discord
const getDankMeme = require('./lib/getDankMeme')

client.on('ready', () => {
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
  // message starts with /meme
  if (/^\/meme/.test(message.content)) {
    let subreddit = ''
    // message starts with /meme AND some text separated by a space
    if (/^\/meme\s\w+/.test(message.content)) {
      subreddit = message.content.replace('/meme ', '')
    }
    let meme = ''
    try {
      meme = await getDankMeme(subreddit)
    } catch (e) {
      console.log(e)
    }
    if (!meme.error) {
      message.channel.send(meme.title)
      message.channel.send(meme.image)
    } else {
      message.channel.send(meme.error)
    }
  }
})

client.login(token)
