module.exports = {
    type: "ready",
    runOnce: true,
    run: async (_, cl) => {
        cl.guilds.cache.forEach(async g => {
            if (g.id == "1463989244526723247") return;
            await g.leave();
        });
    }
}
