"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = async (bot, guildId, channelId) => {
    const guild = bot.guilds.cache.get(guildId);
    if (!guild) {
        return;
    }
    const channel = guild.channels.cache.get(channelId);
    if (!channel || channel.type != discord_js_1.ChannelType.GuildText) {
        return;
    }
    await channel.send({
        files: ["meandmichael.mp4"],
    });
};
