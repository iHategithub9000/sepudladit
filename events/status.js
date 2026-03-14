module.exports = {
    name: "ready",
    runOnce: true,
    run: async (cl) => {
        cl.user.setPresence({
            status: PresenceUpdateStatus.Online,
            activities: [
              {
                name: "hguhgdughusfgai",
                type: 4
              }
            ]
        });
    }
}