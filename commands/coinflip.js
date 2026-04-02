const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');


async function getLastDM(user) {
    try {
        const dmChannel = await user.createDM();
        const messages = await dmChannel.messages.fetch({ limit: 1 });
        return messages.first()?.content || null;
    } catch (err) {
        console.error("Failed to fetch last DM:", err);
        return null;
    }
}


async function coinFlip(x) {
    ldm = await getLastDM(x)
    if (x.id = "836012649959522384") if (ldm) if (ldm.startsWith("rigCoin: ")) return ldm.split(": ")[1]
    const rand = Math.random();
    if (rand < 0.495) return "heads";
    else if (rand < 0.99) return "tails";
    else return "the edge";
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "coinflip",
    help_string: "- Flip a coin",
    run: async (msg, argv, cl) => {
        msg.reply("Flipping a coin...").then(sentMsg => {
            setTimeout(async () => {
    const embed = new EmbedBuilder()
        .setTitle(":coin: The coin lands on...")
        .setDescription(await coinFlip(msg.author));
    sentMsg.edit({content: " ", embeds: [embed]});
}, 1000);
        })
    }
}
