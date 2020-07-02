import { TextChannel, DMChannel, NewsChannel } from 'discord.js';

export interface Media {
  link: string;
  message: string;
  nsfw: boolean;
}
export const announceMedia = async (channel: TextChannel | DMChannel | NewsChannel, media: Media) => {
  if (channel.type !== 'dm') {
    if (!channel.nsfw && media.nsfw) {
      channel.send('Please dont request nsfw media in a sfw channel!');
      return;
    }
  }
  if (media.message.trim() !== '') channel.send(media.message);
  if (media.link.trim() !== '') channel.send(media.link);
};

export const announceError = async (channel: TextChannel | DMChannel | NewsChannel, error: string) => {
  channel.send(error);
};
