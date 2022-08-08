"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("../commands"));
const checkPermissions_1 = __importDefault(require("../helpers/checkPermissions"));
exports.default = async (interaction) => {
    if (interaction.isCommand()) {
        for (const Command of commands_1.default) {
            if (interaction.commandName === Command.data.name) {
                if (Command.permissions && Command.permissions.length > 0) {
                    const permitted = Command.permissions
                        .map((role) => (0, checkPermissions_1.default)(interaction, role))
                        .reduce((prev, curr) => {
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
