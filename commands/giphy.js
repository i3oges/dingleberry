const request = require('request-promise-native')
const giphyKey = require('~/auth').giphyKey
const winston = require('winston')

let getDankMeme = async function (search) {
  let getGiphy = {
    'uri': `https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}`, // default to viral
    'method': 'GET',
    'json': true
  }

  let giphy = {}
  // get an image from a specific search
  if (search) {
    getGiphy.uri = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${search}&limit=25&offset=0&lang=en`
  }
  let list = ''

  // get an giphy dataset
  try {
    list = await request.get(getGiphy)
  } catch (e) {
    winston.log(`giphy request fail: ${e}`)
  }

  if (list.data) {
    // pick a random entry in the dataset
    let content = list.data

    // build giphy data
    if(search){
      content = content[Math.floor(Math.random() * content.length)]
      giphy.title = content.slug
      giphy.image = content.url
      giphy.rating = content.rating
    }else{
      giphy.image = content.image_url
    }

    winston.info(`Retreived content: ${JSON.stringify(content)}\n`)

  } else {
    giphy.error = `Could not find a giphy matching ${search}`
  }

  return giphy
}

let announce = async function (channel, giphy) {
  if (!giphy.error) {
    if (giphy.rating != 'R' || ~channel.name.indexOf('nsfw')) {
      if(giphy.title){
        channel.send(giphy.title)
      }
      channel.send(giphy.image)
    } else {
      channel.send('Dude, gross (sfw only)')
    }
  } else {
    channel.send(giphy.error)
  }
  return giphy
}

module.exports = {
  'get': getDankMeme,
  'announce': announce
}
