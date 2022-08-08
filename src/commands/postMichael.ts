import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "../interfaces/Command";
import postMondayMessage from "../logic/postMondayMessage";

const postMichael: Command = {
  permissions: ["Officers"],
  isEphimeral: true,
  data: new SlashCommandBuilder()
    .setName("pairmeetingprompt")
    .setDescription("Create a pair meeting prompt"),
  run: async (interaction) => {
    if (!interaction.guild?.id || !interaction.channel?.id) {
      await interaction.editReply("Something went wrong");
      return;
    }
    await postMondayMessage(
      interaction.client,
      interaction.guild?.id,
      interaction.channel?.id
    );
    await interaction.editReply("Done");
  },
};

export default postMichael;
