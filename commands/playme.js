const ytdl = require('ytdl-core')
const Discord = require('discord.js')

let playYoutube = async function (client, voiceChannel) {
  let channel = new Discord.VoiceChannel(voiceChannel)
  const ytdl = require('ytdl-core')
  const streamOptions = {'seek': 0, 'volume': 1}
  const broadcast = client.createVoiceBroadcast()

  let connection = await channel.join()
  const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter: 'audioonly' })
  broadcast.playStream(stream)
  const dispatcher = connection.playBroadcast(broadcast)
}

module.exports = async function (message) {
  if (message.member.voiceChannel && message.channel.name === 'music-request') {
  	let url = message.content.split(' ')[1]
    let voiceConnection = await message.member.voiceChannel.join()

    const streamOptions = { seek: 0, volume: 1 }
	  const stream = ytdl(url, { filter: 'audioonly' })

	  const dispatcher = voiceConnection.playStream(stream, streamOptions)

	  return message.member.voiceChannel // so the bot can leave later if needed
  } else {
    message.reply('You need to join a voice channel first!')
  }
}
