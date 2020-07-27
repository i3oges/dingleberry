import { TCNChannel } from '../models/types';
import { Message } from 'discord.js';

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

${prefix}roll [NdF] - roll, where N is the number of rolls and F is the maximum number

${prefix}roleassign @username "the role" - assign a member to a role, only works if you already have that role.\`\`\``;
    channel.send(msg);
  }

  async roleAssign(message: Message, args: string) {
    const [memberStr, ...rest] = args.split(' ');
    const memberID = memberStr.match(/\d+/);
    if (!memberID) {
      message.channel.send(
        'the member argument was not specified properly, try `!roleassign @member "role"`, the @member part should look blue'
      );
      return;
    }
    const member = message.guild?.members.cache.find(m => m.id === memberID[0]);

    if (!member) {
      message.channel.send(`the member ${memberStr} wasn't found in this server`);
      return;
    }
    const role = rest.join(' ').replace(/"/g, '');

    const foundRole = message.guild?.roles.cache.find(grole => grole.name.toLowerCase() === role.toLowerCase());
    if (!foundRole) {
      message.channel.send(`Couldn't find role matching ${role}`);
      return;
    }
    const requesterHasRole = message.member?.roles.cache.find(mrole => mrole.name.toLowerCase() === foundRole.name.toLowerCase());
    if (!requesterHasRole) {
      message.channel.send(`sorry ${message.member}, you do not have the role ${foundRole.name} and thus cannot set it with this bot`);
      return;
    }

    member.roles
      .add(foundRole)
      .catch(err => {
        message.channel.send(`there was an error attempting to assign role: ${err}`);
      })
      .then(() => {
        member.send(`you now have the role "${foundRole.name}"`);
      });
  }
}
