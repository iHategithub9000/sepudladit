
module.exports = {
  type: "ready",
  runOnce: true,
  run: async (client) => {
    client.user.setPresence({
      status: "online",
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
