import { Client } from "discord.js";

import loadCommands from "./helpers/loadCommands";
import validateEnv from "./utils/validateEnv";

import onReady from "./events/onReady";
import onInteraction from "./events/onInteraction";

if (!validateEnv()) {
  throw new Error("Missing environment variables.");
}
(async () => {
  const bot = new Client({
    intents: [
      "Guilds",
      "GuildMembers",
      "GuildMessages",
      "GuildMessageReactions"
    ]
  });

  bot.on("ready", onReady);
  bot.on("interactionCreate", onInteraction);

  bot.login(process.env.DISCORD_TOKEN);
})();
