import fetch from 'node-fetch';
import { GiphyGIF } from '../models/Giphy';
import { Media } from './announce';
interface Giphy {
  title: string;
  image: string;
  rating: string;
  error: string;
}

const getGiphySet = async (search: string): Promise<Media | string> => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${search}&limit=1&offset=0&lang=en`;
  try {
    const req = await fetch(url);
    const list = (await req.json()).data;
    if (list) {
      const gif = list[Math.floor(Math.random() * list.length)] as GiphyGIF;
      return {
        message: gif.title,
        link: gif.url,
        nsfw: gif.rating === 'R',
      };
    }
  } catch (e) {
    console.log(`giphy request fail: ${e}`);
    return 'request failed';
  }
  return 'something went wrong';
};

const getRandomGIF = async (): Promise<Media | string> => {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}`;
  try {
    const req = await fetch(url);
    const list = (await req.json()).data as GiphyGIF;

    if (list) {
      return {
        link: list.url,
        message: list.title,
        nsfw: list.rating === 'R',
      };
    }
    return 'list was empty';
  } catch (e) {
    console.log(`giphy request fail: ${e}`);
    return 'request failed';
  }
};

export const giphyGet = async function (search?: string) {
  // get an image from a specific search
  if (search) {
    return getGiphySet(search);
  }
  return getRandomGIF();
};
