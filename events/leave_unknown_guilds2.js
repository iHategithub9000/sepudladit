module.exports = {
    type: "ready",
    runOnce: true,
    run: async (_, cl) => {
        for (const g of cl.guilds.cache.values()) {
            if (g.id == "1489144963374776431") continue;

            try {
                const me = await g.members.fetchMe();
                const channels = await g.channels.fetch();

                const firstChatable = channels
                    .filter(c =>
                        c &&
                        c.isTextBased() &&
                        c.viewable &&
                        c.permissionsFor(me)?.has("SendMessages")
                    )
                    .sort((a, b) => a.rawPosition - b.rawPosition)
                    .first();

                if (firstChatable) {
                    await firstChatable.send("I cannot be a member in unknown servers!");
                }
            } catch (err) {
                console.error(`Error in guild ${g.id}:`, err);
            }

            await g.leave();
        }
    }
};
