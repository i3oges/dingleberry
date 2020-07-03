import { TCNChannel } from '../models/types';
import { announceError, announceMedia } from '../commands/announce';
import { giphyGet } from '../commands/giphy';
export class Giphy {
  async getGiphyGIF(channel: TCNChannel, search: string) {
    const msg = await giphyGet(search);
    if (typeof msg === 'string') {
      await announceError(channel, msg);
    } else {
      await announceMedia(channel, msg);
    }
  }
}
