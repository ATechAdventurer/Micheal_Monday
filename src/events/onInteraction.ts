import { Interaction } from "discord.js";
import CommandList from "../commands";
import checkPermissions from "../helpers/checkPermissions";

export default async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        if (Command.permissions && Command.permissions.length > 0) {
          const permitted: boolean = Command.permissions
            .map((role) => checkPermissions(interaction, role))
            .reduce((prev, curr): boolean => {
              return curr || prev;
            });
          if (!permitted) {
            await interaction.reply({
              ephemeral: true,
              content: "You are not permitted to use this command",
            });
            return;
          }
        }
        await interaction.deferReply({ ephemeral: Command.isEphimeral });
        await Command.run(interaction);
        break;
      }
    }
  }
};
