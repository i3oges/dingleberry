module.exports = async function (client, voiceChannel) {
  const ytdl = require('ytdl-core')
  const streamOptions = {'seek': 0, 'volume': 1}
  const broadcast = client.createBroadcastStream

  let connection = await voiceChannel.join()
  const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter: 'audioonly' })
  broadcast.playStream(stream)
  const dispatcher = connection.playBroadcast(broadcast)
}
