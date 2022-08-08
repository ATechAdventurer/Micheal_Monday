import { ChannelType, Client } from "discord.js";

export default async (bot: Client, guildId: string, channelId: string) => {
  const guild = bot.guilds.cache.get(guildId);
  if (!guild) {
    return;
  }
  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type != ChannelType.GuildText) {
    return;
  }
  await channel.send({
    files: ["meandmichael.mp4"],
  });
};
