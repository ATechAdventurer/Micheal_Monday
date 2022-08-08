import { GuildMemberRoleManager, Interaction } from "discord.js";

export default (interaction: Interaction, role: string): boolean => {
  const memberRoles = interaction.member?.roles;
  if (!(memberRoles instanceof GuildMemberRoleManager)) {
    return false;
  }
  return !!memberRoles.cache.find((r) => r.name === role);
};
