import { Client, TextChannel, VoiceChannel } from 'discord.js';
import { URL } from 'url';
import { discord as token } from './auth';
import { giphyAnnounce, giphyGet } from './commands/giphy';
import { memeGet, memeAnnounce } from './commands/meme';
import ping from './commands/ping';
import playme from './commands/playme';
import roll from './commands/roll';

const client = new Client();
const commandRegex = /^(?:\!)\w+/;

let joinedVoiceChannel: VoiceChannel;
let lastMeme: string;
let msg;

client.on('ready', async () => {
  console.log('Ready to serve');
});

// // Create an event listener for new guild members
// client.on('guildMemberAdd', (member) => {
//   // Send the message to the guilds default channel (usually #general), mentioning the member
//   member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);

//   // If you want to send the message to a designated channel on a server instead
//   // you can do the following:
//   const channel = member.guild.channels.find('name', 'member-log');
//   // Do nothing if the channel wasn't found on this server
//   if (!channel) return;
//   // Send the message, mentioning the member
//   console.log(`Welcoming ${member}`);
//   channel.send(`Welcome to the server, ${member}`);
// });

client.on('message', async function (message) {
  // messages starting with '!' are commands
  const match = message.content.match(commandRegex);

  if (commandRegex.test(message.content) && match) {
    let command = match[0];
    console.log(message.content);
    let args = message.content.split(commandRegex)[1].trim(); // everything after the command
    let channel = message.channel;
    console.log(`command: ${command}, args: ${args}`);

    switch (command.replace(/^!/, '')) {
      case 'meme':
        lastMeme = args;
        msg = await memeGet(args);
        await memeAnnounce(channel as TextChannel, msg);
        break;
      case 'giphy':
        msg = await giphyGet(args);
        await giphyAnnounce(channel as TextChannel, msg);
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
            channel.send(`${message.author} sorry! I only support youtube links for now.`);
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
        await memeAnnounce(channel as TextChannel, msg);
        break;
      case 'ping':
        channel.send(`${message.author} pong! I've been alive for ${ping()}`);
        break;
      case 'roll':
        let rollArgs = args || '1d20';
        let output = `\`\`\`\n`; // begin block quote
        console.log(`${message.author} requested a roll (${rollArgs})`);

        let finishedRoll = roll(rollArgs); // do the roll(s)
        console.log(finishedRoll);
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
