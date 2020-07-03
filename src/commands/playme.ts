import ytdl from 'ytdl-core';
import { Message } from 'discord.js';

export default async function (message: Message, url: string) {
  //  && message.channel.name === 'music-request' ???
  if (message.member && message.member.voice) {
    try {
      if (message.member.voice.channel) {
        const vc = await message.member.voice.channel.join();
        const streamOptions = { seek: 0, volume: 1 };
        const stream = ytdl(url, { filter: 'audioonly' });
        console.log(`Streaming ${url} to ${message.member.voice}, requested by ${message.member}`);
        const dispatcher = vc.play(stream, streamOptions);
      }
    } catch (e) {
      console.log('playme', e);
    }

    return message.member.voice.channel; // so the bot can leave later if needed
  } else {
    message.reply('You need to join a voice channel first!');
  }
}
