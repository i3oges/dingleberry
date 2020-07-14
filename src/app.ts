import { Client } from 'discord.js';
import hashtag from './commands/hashtag';
import ping from './commands/ping';
import { Giphy } from './controllers/Giphy';
import { Help } from './controllers/Help';
import { Meme } from './controllers/Meme';
import { Roll } from './controllers/Roll';
import { Voice } from './controllers/Voice';
import { log } from './logger';
const client = new Client();
const mc = new Meme();
const vc = new Voice();
const hc = new Help();
const gc = new Giphy();
const rc = new Roll();
const bareCommands = ['giphy', 'playme', 'meme', 'ping', 'roll', 'more', 'help', 'stop', 'motw'];
const availableCommands = bareCommands.map(c => process.env.PREFIX + c);

client.on('ready', async () => {
  log.info('Ready to serve');
});

client.on('message', async function (message) {
  const matched = availableCommands.some(c => message.content.startsWith(c));

  if (message.content.startsWith('#') && !message.content.includes(' ')) {
    log.info(`hashtag: ${message.content}`);
    hashtag(message);
  }

  if (matched && process.env.PREFIX) {
    const prefix = process.env.PREFIX;
    let [command, ...rest] = message.content.split(' ');
    let args = rest.join(' ');
    args = args.trim();
    const { channel } = message;

    log.info(`command: ${command}, args: ${args}`);

    switch (command.replace(prefix, '')) {
      case 'meme':
        mc.getMeme(channel, args);
        break;
      case 'giphy':
        gc.getGiphyGIF(channel, args);
        break;
      case 'playme':
        vc.playSong(args, message, channel);
        break;
      case 'stop':
        vc.stop();
        break;
      case 'more':
        mc.repeatMeme(channel);
        break;
      case 'ping':
        channel.send(`${message.author} pong! I was born ${ping()} ago`);
        break;
      case 'roll':
        rc.doRoll(channel, args);
        break;
      case 'help':
        hc.printHelp(channel);
        break;
      case 'motw':
        mc.getMOTW(message);
        break;
      default:
        channel.send(`The command ${command} wasn't recognized, try \`${prefix}help\``);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
