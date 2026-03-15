const { PresenceUpdateStatus } = require("discord.js");

module.exports = {
  type: "ready",
  runOnce: true,
  run: async (client) => {
    client.user.setPresence({
      status: PresenceUpdateStatus.Online,
      activities: [
        {
          type: 4,
          state: "hguhgdughusfgai",
          emoji: "🔥"
        }
      ]
    })
  }
};
