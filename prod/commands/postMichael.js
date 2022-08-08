"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const postMondayMessage_1 = __importDefault(require("../logic/postMondayMessage"));
const postMichael = {
    permissions: ["Officers"],
    isEphimeral: true,
    data: new builders_1.SlashCommandBuilder()
        .setName("pairmeetingprompt")
        .setDescription("Create a pair meeting prompt"),
    run: async (interaction) => {
        if (!interaction.guild?.id || !interaction.channel?.id) {
            await interaction.editReply("Something went wrong");
            return;
        }
        await (0, postMondayMessage_1.default)(interaction.client, interaction.guild?.id, interaction.channel?.id);
        await interaction.editReply("Done");
    },
};
exports.default = postMichael;
