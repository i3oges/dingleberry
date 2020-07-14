import { Collection, GuildChannel, Message, MessageAttachment, TextChannel } from 'discord.js';
import moment, { Moment } from 'moment';
import pptxgen from 'pptxgenjs';

export default async function (message: Message) {
  const [begin, end] = getDateRange();

  const status = await message.channel.send(
    `getting memes from ${begin.month() + 1}-${begin.date()} to ${end.month() + 1}-${end.date()}...`
  );
  message.channel.startTyping();

  const title = `Meme of the Week ${begin.month() + 1}-${begin.date()} ${end.month() + 1}-${end.date()}`;
  const memeChannel = message.member?.guild.channels.cache.find(el => el.name === 'memes');
  if (memeChannel) {
    const attachments = await getMemeAttachments(memeChannel, begin, end);
    if (attachments && attachments.length > 0) {
      const pptx = generatePDF(attachments);
      pptx.title = title;

      const attachment = new MessageAttachment((await pptx.stream()) as Buffer, `${title}.pptx`);
      message.channel.stopTyping();
      await status.delete();
      await message.channel.send('Fresh memes are ready for review!');
      message.channel.send(attachment);
    } else {
      message.channel.send(`no memes found from ${begin.month() + 1}-${begin.date()} ${end.month() + 1}-${end.date()}`);
    }
  } else {
    message.channel.send('no meme channel found, please place memes in a channel called `memes`');
  }
}

const generatePDF = (attachments: Collection<string, MessageAttachment>[]) => {
  const pres = new pptxgen();
  attachments.forEach(a => {
    const first = a.first();
    if (!first) return;

    const path = first.attachment;
    if (typeof path !== 'string') return;
    const ppi = 200;
    const h = first.height || 2 / ppi;
    const w = first.width || 2 / ppi;

    pres.addSlide().addImage({ path, x: 0.4, h, w, sizing: { type: 'contain', h: 6, w: 7 } });
  });
  return pres;
};

const getDateRange = () => {
  const begin = moment().subtract(7, 'days');

  while (begin.isoWeekday() !== 1) {
    begin.subtract(1, 'day');
  }
  begin.set({ h: 0, m: 0, s: 0, minutes: 0 });
  const end = begin.clone().add(6, 'days');
  end.set({ h: 23, minute: 59, s: 59 });

  return [begin, end];
};

const getMemeAttachments = async (channel: GuildChannel, begin: Moment, end: Moment) => {
  if (channel instanceof TextChannel) {
    const messages = await channel.messages.fetch({ limit: 50 });
    return messages.reduce((acc: Collection<string, MessageAttachment>[], { createdAt, attachments }) => {
      if (moment(createdAt).isBetween(begin, end) && attachments.size > 0) {
        acc.push(attachments);
      }
      return acc;
    }, []);
  }
};
