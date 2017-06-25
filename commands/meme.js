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
  if (subreddit) {
    getImgur.uri = `https://api.imgur.com/3/gallery/r/${subreddit}`
  }
  let list = ''

  // get an imgur dataset
  try {
    list = await request.get(getImgur)
  } catch (e) {
    winston.log(`imgur request fail: ${e}`)
  }

  if (list.data.length > 0) {
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

let announce = async function (channel, meme) {
  if (!meme.error) {
    if (!meme.nsfw || ~channel.name.indexOf('nsfw')) {
      channel.send(meme.title)
      channel.send(meme.image)
    } else {
      channel.send('Dude, gross (sfw only)')
    }
  } else {
    channel.send(meme.error)
  }
  return meme
}

module.exports = {
  'get': getDankMeme,
  'announce': announce
}
