const getDankMeme = require('~/lib/getDankMeme')
module.exports = async function (message) {
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
    if (!meme.nsfw || ~message.channel.name.indexOf('nsfw')) {
      message.channel.send(meme.title)
      message.channel.send(meme.image)
    } else {
      message.channel.send('Dude, gross (sfw only)')
    }
  } else {
    message.channel.send(meme.error)
  }
}
