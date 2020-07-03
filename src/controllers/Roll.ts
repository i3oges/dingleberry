import { Message } from 'discord.js';
import roll from '../commands/roll';
import { TCNChannel } from '../models/types';

export class Roll {
  doRoll(channel: TCNChannel, args: string) {
    let rollArgs = args || '1d20';
    let output = `\`\`\`\n`; // begin block quote

    let finishedRoll = roll(rollArgs); // do the roll(s)
    for (let i = 0; i < finishedRoll.results.length; i++) {
      output += `\nDie ${i}: ${finishedRoll.results[i]}/${finishedRoll.faces}`; // Each roll
    }
    output += `\n${finishedRoll.message}: ${finishedRoll.sum} \`\`\``; // "Rolled" or a custom message + sum + end blockquote

    channel.send(output);
  }
}
