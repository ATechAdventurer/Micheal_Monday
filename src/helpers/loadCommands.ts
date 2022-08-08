import fs from "fs";
import path from "path";
import { Client, Collection } from "discord.js";

export default async function loadCommands(
  bot: Client
): Promise<Collection<string, any>> {
  const commands = new Collection<string, any>();
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".js"));
  for (let i = 0; i < commandFiles.length; i++) {
    const command = (
      await import(path.join(__dirname, "../commands/", commandFiles[i]))
    ).default;
    commands.set(command.data.name, command);
  }
  return commands;
}
