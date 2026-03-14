const { EmbedBuilder } = require('discord.js');
const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const fetch = (...args) => import("node-fetch").then(m => m.default(...args));
module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "define",
    help_string: "<word> - Looks up a word in the dictionary.",
    run: async (msg, argv) => {
        if (argv.length < 2) return msg.reply("Please specify a word to define.");

        const word = argv[1];
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await res.json();

            if (!data || data.title === "No Definitions Found") {
                return msg.reply(`No definitions found for **${word}**.`);
            }

            const meanings = data[0].meanings.map(m => `**${m.partOfSpeech}**: ${m.definitions[0].definition}`).join("\n");

            const embed = new EmbedBuilder()
                .setTitle(`Definition of ${word}`)
                .setDescription(meanings)
                .setColor(0x00ff00);

            msg.reply({ embeds: [embed] });
        } catch (err) {
            msg.reply("Something went wrong while fetching the definition.");
        }
    }
};

