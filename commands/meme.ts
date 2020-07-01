import rp from 'request-promise-native';
const { get: _get } = rp;
import { imgur as clientId } from '../auth';
import { TextChannel } from 'discord.js';

interface Meme {
  nsfw: boolean;
  image: string;
  title: string;
  error: string;
}

export const memeGet = async function (subreddit?: string) {
  let getImgur = {
    uri: 'https://api.imgur.com/3/gallery/hot/viral/0.json', // default to viral
    method: 'GET',
    json: true,
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
  };

  let meme: Meme = {
    nsfw: false,
    error: '',
    title: '',
    image: '',
  };
  // get an image from a specific subreddit
  if (subreddit) {
    getImgur.uri = `https://api.imgur.com/3/gallery/r/${subreddit}`;
  }
  let list;

  // get an imgur dataset
  try {
    list = await _get(getImgur);
  } catch (e) {
    console.log(`imgur request fail: ${e}`);
  }

  if (list.data.length > 0) {
    // pick a random entry in the dataset
    let content = list.data[Math.floor(Math.random() * list.data.length)];

    console.log(`Retreived content: ${JSON.stringify(content)}\n`);

    // build meme data
    meme.nsfw = content.nsfw;
    meme.image = content.link;
    meme.title = content.title;
  } else {
    meme.error = `Could not find a subreddit matching ${subreddit}`;
  }

  return meme;
};

export const memeAnnounce = async function (channel: TextChannel, meme: Meme) {
  if (!meme.error) {
    if (!meme.nsfw || ~channel.name.indexOf('nsfw')) {
      channel.send(meme.title);
      channel.send(meme.image);
    } else {
      channel.send('Dude, gross (sfw only)');
    }
  } else {
    channel.send(meme.error);
  }
  return meme;
};
