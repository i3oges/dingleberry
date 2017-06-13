const request = require('request-promise-native')
const clientId = require('~/auth').imgur
module.exports = async function (subreddit) {
  let getImgur = {
    'uri': 'https://api.imgur.com/3/gallery/hot/viral/0.json', // default to viral
    'method': 'GET',
    'json': true,
    'headers': {
      'Authorization': `Client-ID ${clientId}`
    }
  }

  let meme = {}
  // get an image from a specific subreddit, or get a random image from hot viral
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

    console.log(`${date} - Retreived content: ${JSON.stringify(content)}\n`)

    // don't show nsfw images
    meme.nsfw = content.nsfw
    meme.image = content.link
    meme.title = content.title
  } else {
    meme.error = `Could not find a subreddit matching ${subreddit}`
  }

  return meme
}
