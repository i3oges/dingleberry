import { TextChannel, DMChannel, NewsChannel, Channel } from 'discord.js';
import { memeGet } from '../commands/meme';
import { announceError, announceMedia } from '../commands/announce';
import { TCNChannel } from '../models/types';

export class Meme {
  lastSearch?: string;

  async getMeme(channel: TCNChannel, search?: string) {
    const msg = await memeGet(search);
    if (typeof msg === 'string') {
      await announceError(channel, msg);
    } else {
      this.lastSearch = search;
      await announceMedia(channel, msg);
    }
  }

  async repeatMeme(channel: TCNChannel) {
    const msg = await memeGet(this.lastSearch);
    if (typeof msg === 'string') {
      await announceError(channel, msg);
    } else {
      await announceMedia(channel, msg);
    }
  }
}
