const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import("node-fetch").then(m => m.default(...args));
const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,

    name: "urban",
    help_string: "<word> - Looks up a word on Urban Dictionary.",
    run: async (msg, argv) => {
        if (argv.length < 2) return msg.reply("Please specify a word to look up.");

        const term = encodeURIComponent(argv.slice(1).join(" "));
        try {
            const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${term}`);
            const data = await res.json();

            if (!data.list || data.list.length === 0) {
                return msg.reply(`No Urban Dictionary entries found for **${term}**.`);
            }

            const top = data.list[0];
            const embed = new EmbedBuilder()
                .setTitle(`Urban Definition of ${top.word}`)
                .setDescription(top.definition.length > 1024 ? top.definition.slice(0, 1020) + "..." : top.definition)
                .addFields({ name: "Example", value: top.example.length > 1024 ? top.example.slice(0, 1020) + "..." : top.example })
                .setColor(0xff5500)
                .setFooter({ text: `👍 ${top.thumbs_up} | 👎 ${top.thumbs_down}` });

            msg.reply({ embeds: [embed] });
        } catch (err) {
            msg.reply("Something went wrong while fetching the Urban Dictionary entry.");
        }
    }
};