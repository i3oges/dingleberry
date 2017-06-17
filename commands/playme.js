const ytdl = require('ytdl-core')
const winston = require('winston')

module.exports = async function (message) {
  if (message.member.voiceChannel && message.channel.name === 'music-request') {
    let url = message.content.split(' ')[1]
    let voiceConnection = await message.member.voiceChannel.join()

    const streamOptions = { seek: 0, volume: 1 }
    const stream = ytdl(url, { filter: 'audioonly' })
    winston.info(`Streaming ${url} to ${message.member.voiceChannel}`)
    const dispatcher = voiceConnection.playStream(stream, streamOptions)

    return message.member.voiceChannel // so the bot can leave later if needed
  } else {
    message.reply('You need to join a voice channel first!')
  }
}
