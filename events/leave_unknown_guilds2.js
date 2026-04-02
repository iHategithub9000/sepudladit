module.exports = {
    type: "ready",
    runOnce: true,
    run: async (_, cl) => {
        cl.guilds.cache.forEach(async g => {
            if (g.id == "1463989244526723247" || g.id == "1272960100751114240" || g.id == "1489144963374776431") return;
            await g.leave();
        });
    }
}
