"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = (interaction, role) => {
    const memberRoles = interaction.member?.roles;
    if (!(memberRoles instanceof discord_js_1.GuildMemberRoleManager)) {
        return false;
    }
    return !!memberRoles.cache.find((r) => r.name === role);
};
