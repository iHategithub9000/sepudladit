function parseCLI(str) {
  const re = /[^\s"]+|"([^"]*)"/gi;
  const args = [];
  let match;

  while ((match = re.exec(str))) {
    args.push(match[1] ?? match[0]);
  }

  return args;
}
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { RestrictionsEnum } = require("../commandAccessRestrictions.js")
module.exports = {
  accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
  accessRestrictionArgs: PermissionsBitField.Flags.ManageMessages,
  name: "announce",
  help_string: "<announcement_title> <announcement_content> <ping_everyone: true or false> - Sends an announcement in the channel where the command was ran. Your command is deleted after. Requires Manage Messages.",
  run: async (msg, argv, cl) => {
    argv = parseCLI(msg.content).slice(1)
    const ch = msg.channel;
    const at = msg.author.tag;
    await msg.delete();
    const embed = new EmbedBuilder()
      .setTitle("📬 Announcement - "+argv[0])
      .setDescription(argv[1])
      .setColor(0x00ff00)
      .setFooter({text:"Announced by "+at})

    ch.send({embeds:[embed], content: argv[2]=="true" ? "|| @everyone ||" : "|| Ping disabled ||"})
  }
}
