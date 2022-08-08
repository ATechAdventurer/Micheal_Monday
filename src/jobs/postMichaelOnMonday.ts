import Job from "../interfaces/Job";
import postMondayMessage from "../logic/postMondayMessage";
import validateEnv from "../utils/validateEnv";

const postMichaelOnMonday: Job = {
  cron: "00 10 * * MON",
  run: async (bot) => {
    if (!validateEnv()) {
      return;
    }
    const { GUILD_ID, CHANNEL_ID } = process.env;
    if (!GUILD_ID || !CHANNEL_ID) {
      return;
    }
    await postMondayMessage(bot, GUILD_ID, CHANNEL_ID);
  },
  runOnInit: false,
};

export default postMichaelOnMonday;
