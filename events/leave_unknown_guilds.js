module.exports = {
    type: "guildCreate",
    runOnce: false,
    run: async (_, cl) => {
        cl.guilds.cache.forEach(async g => {
            if (g.id == "1463989244526723247" || g.id == "1272960100751114240") return;
            await g.leave();
        });
    }
}
