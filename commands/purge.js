

const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageChannels,
    name: "purge",
    help_string: " - Purges a channel to the best of the bot's ability. Requires Manage Channels permission.",
    run: async (msg, argv, cl) => {
        try {
            const ch = msg.channel
            const auth = msg.author.tag
            while (true) {
              const messages = await ch.messages.fetch({ limit: 100 });
              if (!messages.size) break;
          
              const deleted = await ch.bulkDelete(messages, true);
              if (deleted.size < 2) break;
          
              await new Promise(r => setTimeout(r, 1000)); // avoid rate limits
            }
                        const embed = new EmbedBuilder()
            .setTitle(":broom: Purge completed.")
            .setFooter({text:"Purge requested by "+auth})
            .setColor(0x00ff00)
            for (let i = 0; i < 100; i++) {
              await ch.send(":broom:"+("\n".repeat(200))+":broom: Filler message #"+i)
            }
            await ch.send({embeds:[embed]})
        } catch (e) {
            const embed = new EmbedBuilder()
            .setTitle(":x: Purge failed.")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setColor(0xff0000)
            await msg.reply({embeds:[embed]})
        }
    }
}
