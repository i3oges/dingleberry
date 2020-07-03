import { TCNChannel } from '../models/types';

export class Help {
  printHelp(channel: TCNChannel) {
    const prefix = process.env.PREFIX;
    const msg = `These are my current commands\`\`\`
${prefix}meme [subreddit] - Gets a random image from imgur's viral posts, or one of the top images from any subreddit on imgur

${prefix}more - Repeats the last "${prefix}meme" command

${prefix}giphy [search] - Get a giphpy gif (why...)

${prefix}playme [url] - Plays a youtube video url in your currently joined voice channel

${prefix}stop - Stops playing music in said voice channel

${prefix}ping - ping the bot

${prefix}roll [F] - roll, where F is the maximum number

${prefix}roll [NdF] - roll, where N is the number of rolls and F is the maximum number\`\`\``;
    channel.send(msg);
  }
}
