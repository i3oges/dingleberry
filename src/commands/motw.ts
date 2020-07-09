import { Message, TextChannel, MessageAttachment, Collection, GuildChannel } from 'discord.js';
import moment, { Moment } from 'moment';

export default async function (message: Message) {
  const [begin, end] = motwRange();
  const memeChannel = message.member?.guild.channels.cache.find(el => el.name === 'memes');
  if (memeChannel) {
    const attachments = await getMemeAttachments(memeChannel, begin, end);
    if (attachments && attachments.length > 0) {
    }
  }
}

const motwRange = () => {
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
    const messages = await channel.messages.fetch({ limit: 10 });
    return messages.reduce((acc: Collection<string, MessageAttachment>[], { createdAt, attachments }) => {
      if (moment(createdAt).isBetween(begin, end) && attachments.size > 0) {
        acc.push(attachments);
      }
      return acc;
    }, []);
  }
};
