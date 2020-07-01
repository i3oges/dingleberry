import rp from 'request-promise-native';
const { get: _get } = rp;
import { giphyKey } from '../auth';
import { TextChannel, DMChannel, NewsChannel } from 'discord.js';

interface Giphy {
  title: string;
  image: string;
  rating: string;
  error: string;
}

export const giphyGet = async function (search?: string) {
  let getGiphy = {
    uri: `https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}`, // default to viral
    method: 'GET',
    json: true,
  };

  let giphy: Giphy = {
    title: '',
    image: '',
    rating: '',
    error: '',
  };
  // get an image from a specific search
  if (search) {
    getGiphy.uri = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${search}&limit=25&offset=0&lang=en`;
  }
  let list;

  // get an giphy dataset
  try {
    list = await _get(getGiphy);
    console.log(JSON.stringify(list));
  } catch (e) {
    console.log(`giphy request fail: ${e}`);
  }

  if (list.data) {
    // pick a random entry in the dataset
    let content = list.data;

    // build giphy data
    if (search) {
      content = content[Math.floor(Math.random() * content.length)];
      giphy.title = content.slug;
      giphy.image = content.url;
      giphy.rating = content.rating;
    } else {
      giphy.image = content.image_url;
    }

    console.log(`Retreived content: ${JSON.stringify(content)}\n`);
  } else {
    giphy.error = `Could not find a giphy matching ${search}`;
  }

  return giphy;
};

export const giphyAnnounce = async function (channel: TextChannel | DMChannel | NewsChannel, giphy: Giphy) {
  if (giphy.error) {
    channel.send(giphy.error);
    return giphy;
  }
  if ('name' in channel) {
    if (giphy.rating != 'R' || channel.name.includes('nsfw')) {
      if (giphy.title) {
        channel.send(giphy.title);
      }
      channel.send(giphy.image);
    } else {
      channel.send('Dude, gross (sfw only)');
    }
  } else {
    channel.send('cant send here');
  }
  return giphy;
};
