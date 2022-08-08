import { REST } from "@discordjs/rest";
import { ActivityType, Client } from "discord.js";
import { Routes } from "discord-api-types/v10";
import cron from "cron";

import JobList from "../jobs";
import CommandList from "../commands";

export default async (bot: Client) => {
  const commandData = CommandList.map((command) => command.data.toJSON());
  const rest = new REST({ version: "9" }).setToken(
    process.env.DISCORD_TOKEN as string
  );
  await rest.put(
    Routes.applicationGuildCommands(
      bot.user?.id || "missing id",
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  );
  console.log("Commands deployed!");
  console.log("Bot is ready!");
  bot.user?.setPresence({
    status: "online",
    activities: [{ name: "Is it monday??", type: ActivityType.Playing }],
  });

  for (let i = 0; i < JobList.length; i++) {
    const job = JobList[i];
    const cronJob = new cron.CronJob(
      job.cron,
      async () => {
        try {
          await job.run(bot);
        } catch (error) {
          console.warn(error);
        }
      },
      null,
      true,
      "America/Chicago"
    );
    cronJob.start();
    if (job.runOnInit) {
      await job.run(bot);
    }
  }
};
