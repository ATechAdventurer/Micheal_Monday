import { Client } from "discord.js";

export default interface Job {
  cron: string;
  run: (bot: Client) => Promise<void>;
  runOnInit: boolean;
}
