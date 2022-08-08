export default () => {
  if (!process.env.DISCORD_TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }
  if (!process.env.CLIENT_ID) {
    console.warn("Missing client ID.");
    return false;
  }
  if (!process.env.GUILD_ID) {
    console.warn("Missing guild ID.");
    return false;
  }
  if (!process.env.CHANNEL_ID) {
    console.warn("Missing channel ID.");
    return false;
  }
  return true;
};
