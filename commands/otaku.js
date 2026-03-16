const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require("discord.js");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const reactions = {
    hug: { verb: "hugs", solo: "wants to be hugged" },
    kiss: { verb: "kisses", solo: "wants to be kissed" },
    blush: { verb: "blushes", solo: "is blushing" },
    clap: { verb: "claps for", solo: "claps" },
    cry: { verb: "cries with", solo: "cries" },
    facepalm: { verb: "facepalms at", solo: "facepalms" },
    handhold: { verb: "holds hands with", solo: "holds hands with someone"},
    happy: { verb: "is happy with", solo: "is happy" },
    no: { verb: "says no to", solo: "says no" },
    yes: { verb: "says yes to", solo: "says yes" },
    pat: { verb: "pats", solo: "wants to be pet" },
    scared: { verb: "is scared of", solo: "is scared" },
    tickle: { verb: "tickles", solo: "wants to be tickled" }
};

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "otaku",
    help_string: "<action> [user] - anime reaction",

    run: async (msg, argv, cl) => {

        const action = argv[1];
        if (action == "list") {
            await msg.reply(JSON.stringify(Object.keys(reactions)))
            return;
        }
        
        const data = reactions[action];

        if (!data) {
            return msg.reply(`Actions: ${Object.keys(reactions).join(", ")}`);
        }

        const target = msg.mentions.users.first();

        const res = await fetch(`https://api.otakugifs.xyz/gif?reaction=${action}`);
        const gif = await res.json();

        let text;

        if (target) {
            text = `**${msg.author.username}** ${data.verb} **${target.username}**`;
        } else {
            text = `**${msg.author.username}** ${data.solo || data.verb}`;
        }

        const embed = new EmbedBuilder()
            .setDescription(text)
            .setImage(gif.url);

        msg.reply({ embeds: [embed] });
    }
};
