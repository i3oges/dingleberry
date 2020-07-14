import { Message } from 'discord.js';
import { announceMedia } from '../commands/announce';
import { memeGet } from '../commands/meme';
import motw from '../commands/motw';
import { TCNChannel } from '../models/types';

export class Meme {
  lastSearch?: string;
  getMOTW = (message: Message) => motw(message);

  async getMeme(channel: TCNChannel, search?: string) {
    const msg = await memeGet(search);
    if (typeof msg === 'string') {
      channel.send(msg);
    } else {
      this.lastSearch = search;
      await announceMedia(channel, msg);
    }
  }

  async repeatMeme(channel: TCNChannel) {
    const msg = await memeGet(this.lastSearch);
    if (typeof msg === 'string') {
      channel.send(msg);
    } else {
      await announceMedia(channel, msg);
    }
  }
}
