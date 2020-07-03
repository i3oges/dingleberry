import { Message, VoiceChannel } from 'discord.js';
import { TCNChannel } from '../models/types';
import playme from '../commands/playme';
export class Voice {
  joinedVoiceChannel?: VoiceChannel;

  async playSong(search: string, message: Message, channel: TCNChannel) {
    if (search) {
      let url = new URL(search);
      if (/youtu\.?be/.test(url.host)) {
        const jvc = await playme(message, url.href);
        if (jvc) {
          this.joinedVoiceChannel = jvc;
        }
      } else {
        console.log(`${message} wasn't supported`);
        channel.send(`${message.author} sorry! I couldnt play that link!`);
      }
    } else {
      channel.send(`${message.author} please supply a youtube url for me to play`);
    }
  }
  stop() {
    if (this.joinedVoiceChannel) {
      this.joinedVoiceChannel.leave();
    }
  }
}
