import { announceMedia } from '../commands/announce';
import { memeGet } from '../commands/meme';
import { TCNChannel } from '../models/types';
import motw from '../commands/motw';
import { Client, Message } from 'discord.js';

export class Meme {
  lastSearch?: string;

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

  async getMOTW(message: Message) {
    motw(message);

    // channel.send(weekStart);
  }
}
