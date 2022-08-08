"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const onReady_1 = __importDefault(require("./events/onReady"));
const onInteraction_1 = __importDefault(require("./events/onInteraction"));
if (!(0, validateEnv_1.default)()) {
    throw new Error("Missing environment variables.");
}
(async () => {
    const bot = new discord_js_1.Client({
        intents: [
            "Guilds",
            "GuildMembers",
            "GuildMessages",
            "GuildMessageReactions"
        ]
    });
    bot.on("ready", onReady_1.default);
    bot.on("interactionCreate", onInteraction_1.default);
    bot.login(process.env.DISCORD_TOKEN);
})();
