module.exports = {
    type: "guildCreate",
    runOnce: false,
    run: async (_, cl) => {
        cl.guilds.cache.forEach(async g => {
            if (g.id == "1272960100751114240" || g.id == "1489144963374776431" || g.id == "1463989244526723247") return;

            const firstChatable = g.channels.cache
                .filter(c =>
                    c.isTextBased() &&
                    c.viewable &&
                    c.permissionsFor(g.members.me)?.has("SendMessages")
                )
                .sort((a, b) => a.rawPosition - b.rawPosition)
                .first();

            if (firstChatable) {
                await firstChatable.send("I cannot join unknown servers!");
            }

            await g.leave();
        });
    }
};
