"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const cron_1 = __importDefault(require("cron"));
const jobs_1 = __importDefault(require("../jobs"));
const commands_1 = __importDefault(require("../commands"));
exports.default = async (bot) => {
    const commandData = commands_1.default.map((command) => command.data.toJSON());
    const rest = new rest_1.REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    await rest.put(v10_1.Routes.applicationGuildCommands(bot.user?.id || "missing id", process.env.GUILD_ID), { body: commandData });
    console.log("Commands deployed!");
    console.log("Bot is ready!");
    bot.user?.setPresence({
        status: "online",
        activities: [{ name: "Is it monday??", type: discord_js_1.ActivityType.Playing }],
    });
    for (let i = 0; i < jobs_1.default.length; i++) {
        const job = jobs_1.default[i];
        const cronJob = new cron_1.default.CronJob(job.cron, async () => {
            try {
                await job.run(bot);
            }
            catch (error) {
                console.warn(error);
            }
        }, null, true, "America/Chicago");
        cronJob.start();
        if (job.runOnInit) {
            await job.run(bot);
        }
    }
};
