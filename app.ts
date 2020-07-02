import { Client, TextChannel, VoiceChannel } from 'discord.js';
import { URL } from 'url';
import { discord as token } from './auth';
import { announceError, announceMedia, Media } from './src/commands/announce';
import { giphyGet } from './src/commands/giphy';
import { memeGet } from './src/commands/meme';
import ping from './src/commands/ping';
import playme from './src/commands/playme';
import roll from './src/commands/roll';

const client = new Client();
const commandRegex = /^(?:\!)\w+/;

let joinedVoiceChannel: VoiceChannel;
let lastMeme: string;
let msg: Media | string;

client.on('ready', async () => {
  console.log('Ready to serve');
});

client.on('message', async function (message) {
  // messages starting with '!' are commands
  const match = message.content.match(commandRegex);

  if (commandRegex.test(message.content) && match) {
    let command = match[0];

    let args = message.content.split(commandRegex)[1].trim(); // everything after the command
    let channel = message.channel;

    switch (command.replace(/^!/, '')) {
      case 'meme':
        lastMeme = args;
        msg = await memeGet(args);
        if (typeof msg === 'string') {
          await announceError(channel, msg);
        } else {
          await announceMedia(channel, msg);
        }
        break;
      case 'giphy':
        msg = await giphyGet(args);
        if (typeof msg === 'string') {
          await announceError(channel, msg);
        } else {
          await announceMedia(channel, msg);
        }
        break;
      case 'playme':
        if (args) {
          let url = new URL(args);
          if (/youtu\.?be/.test(url.host)) {
            const jvc = await playme(message);
            if (jvc) {
              joinedVoiceChannel = jvc;
            }
          } else {
            console.log(`${message} wasn't supported`);
            channel.send(`${message.author} sorry! I couldnt play that link!`);
          }
        } else {
          channel.send(`${message.author} please supply a youtube url for me to play`);
        }
        break;
      case 'stop':
        if (joinedVoiceChannel) {
          joinedVoiceChannel.leave();
        }
        break;
      case 'more':
        msg = await memeGet(lastMeme);
        if (typeof msg === 'string') {
          await announceError(channel, msg);
        } else {
          await announceMedia(channel, msg);
        }
        break;
      case 'ping':
        channel.send(`${message.author} pong! I've been alive for ${ping()}`);
        break;
      case 'roll':
        let rollArgs = args || '1d20';
        let output = `\`\`\`\n`; // begin block quote
        console.log(`${message.author} requested a roll (${rollArgs})`);

        let finishedRoll = roll(rollArgs); // do the roll(s)
        for (let i = 0; i < finishedRoll.results.length; i++) {
          output += `\nDie ${i}: ${finishedRoll.results[i]}/${finishedRoll.faces}`; // Each roll
        }
        output += `\n${finishedRoll.message}: ${finishedRoll.sum} \`\`\``; // "Rolled" or a custom message + sum + end blockquote

        channel.send(output);
        break;
      default:
        channel.send(`The command ${command} wasn't recognized`);
    }
  }
});

client.login(token);
