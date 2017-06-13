const playYoutube = require('~/lib/playYoutube')
const ytdl = require('ytdl-core')
module.exports = async function (message) {
  if (message.member.voiceChannel && message.channel.name === 'music-request') {
  	let url = message.content.split(' ')[1]
    let voiceConnection = await message.member.voiceChannel.join()

    const streamOptions = { seek: 0, volume: 1 }
	  const stream = ytdl(url, { filter: 'audioonly' })

	  const dispatcher = voiceConnection.playStream(stream, streamOptions)
  } else {
    message.reply('You need to join a voice channel first!')
  }
}
