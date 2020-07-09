import { announceMedia } from '../commands/announce';
import { giphyGet } from '../commands/giphy';
import { TCNChannel } from '../models/types';
export class Giphy {
  async getGiphyGIF(channel: TCNChannel, search: string) {
    const msg = await giphyGet(search);
    if (typeof msg === 'string') {
      channel.send(msg);
    } else {
      await announceMedia(channel, msg);
    }
  }
}
