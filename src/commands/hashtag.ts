import { Message, MessageAttachment } from 'discord.js';
import { log } from '../logger';
const ttpng = require('text2png');

interface Options {
  font?: string;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  lineSpacing?: number;
  strokeWidth?: number;
  strokeColor?: string;
  padding?: number;
  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  borderWidth?: number;
  borderLeft?: number;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderColor?: string;
  localFontPath?: string;
  localFontName?: string;
  output?: 'buffer' | 'stream' | 'dataURL' | 'canvas';
}

export default async function (message: Message) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const options: Options = {
    color: `rgb(${r}, ${g}, ${b})`,
    padding: 4,
  };
  try {
    const image = await ttpng(message.content.toUpperCase(), options);
    const attachment = new MessageAttachment(image, `${message.content}.png`);

    message.channel.send(attachment);
  } catch (e) {
    log.error(`text to png: ${e}`);
  }
}
