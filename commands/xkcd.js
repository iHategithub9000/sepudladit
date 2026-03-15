const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "xkcd",
    help_string: "[<comic_number>] - Displays an XKCD comic. If no comic number is provided, the latest comic will be displayed.",
    run: async (msg, argv, cl) => {
        num = (argv[1] ? argv[1] + "/" : false) || "";
        const res = await fetch()(`https://xkcd.com/${num}info.0.json`);
        
        res.text().then(json => {
            json = JSON.parse(json);
            msg.reply(`# ${json.num} - ${json.title}\n\n${json.alt}\n\n${json.img}`);
        }).catch(e => {
            const embed = new EmbedBuilder()
            .setTitle(":x: Failed to fetch XKCD comic.")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setColor(0xff0000)
            msg.reply({embeds:[embed]})
        })
    }
}