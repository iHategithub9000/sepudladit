const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');



function coinFlip() {
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
            setTimeout(() => {
                const embed = new EmbedBuilder()
                .setTitle(":coin: The coin lands on...")
                .setDescription(coinFlip())
                sentMsg.edit({content: " ", embeds: [embed]})
            }, 1000);
        })
    }
}