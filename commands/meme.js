const request = require('request-promise-native')
const clientId = require('~/auth').imgur
const winston = require('winston')

let getDankMeme = async function (subreddit) {
  let getImgur = {
    'uri': 'https://api.imgur.com/3/gallery/hot/viral/0.json', // default to viral
    'method': 'GET',
    'json': true,
    'headers': {
      'Authorization': `Client-ID ${clientId}`
    }
  }

  let meme = {}
  // get an image from a specific subreddit
  if (subreddit !== '') {
    getImgur.uri = `https://api.imgur.com/3/gallery/r/${subreddit}`
  }
  let list = ''

  // get an imgur dataset
  list = await request.get(getImgur)

  if (list.data.length > 0) {
    let date = new Date()

    // pick a random entry in the dataset
    let content = list.data[Math.floor(Math.random() * list.data.length)]

    winston.info(`Retreived content: ${JSON.stringify(content)}\n`)

    // build meme data
    meme.nsfw = content.nsfw
    meme.image = content.link
    meme.title = content.title
  } else {
    meme.error = `Could not find a subreddit matching ${subreddit}`
  }

  return meme
}

let announce = async function (message) {
  let subreddit = ''
    // message starts with /meme AND some text separated by a space
  if (/^\/meme\s\w+/.test(message.content)) {
    subreddit = message.content.replace('/meme ', '')
  }
  let meme = ''
  try {
    meme = await getDankMeme(subreddit)
  } catch (e) {
    winston.error(e)
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
  return meme
}

module.exports = announce
