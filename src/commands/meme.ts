import fetch from 'node-fetch';
import { imgur as clientId } from '../../auth';
import { TextChannel } from 'discord.js';
import { ImgurPost } from '../models/Imgur';
import { Media } from './announce';
interface Meme {
  nsfw: boolean;
  image: string;
  title: string;
  error: string;
}

export const memeGet = async function (subreddit?: string): Promise<Media | string> {
  let url = 'https://api.imgur.com/3/gallery/hot/viral/0.json';

  // get an image from a specific subreddit
  if (subreddit) {
    url = `https://api.imgur.com/3/gallery/r/${subreddit}`;
  }
  let list;

  // get an imgur dataset
  try {
    list = await (await fetch(url, { headers: { Authorization: `Client-ID ${clientId}` } })).json();
  } catch (e) {
    console.log(`imgur request fail: ${e}`);
  }

  if (list && list.data && list.data.length > 0) {
    // pick a random entry in the dataset
    let content = list.data[Math.floor(Math.random() * list.data.length)] as ImgurPost;
    // build meme data
    return {
      link: content.link,
      message: content.title,
      nsfw: content.nsfw,
    };
  }
  return `Could not find a subreddit matching ${subreddit}`;
};
