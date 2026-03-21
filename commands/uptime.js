const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "uptime",
    help_string: "- shows bot uptime",
    run: async (msg, argv, cl) => {
        // Bot uptime (convert ms → s)
        const botUptimeSec = cl.uptime / 1000;
        const botHours = Math.floor(botUptimeSec / 3600);
        const botMinutes = Math.floor((botUptimeSec % 3600) / 60);
        const botSeconds = Math.floor(botUptimeSec % 60);

        // Machine uptime (in seconds)
        const machineUptimeSec = os.uptime();
        const machHours = Math.floor(machineUptimeSec / 3600);
        const machMinutes = Math.floor((machineUptimeSec % 3600) / 60);
        const machSeconds = Math.floor(machineUptimeSec % 60);

        const embed = new EmbedBuilder()
            .setTitle('⏱ Uptime Info')
            .setColor(0x00FF00)
            .setDescription(
                `**Bot Uptime:** ${botHours}h ${botMinutes}m ${botSeconds}s\n` +
                `**Machine Uptime:** ${machHours}h ${machMinutes}m ${machSeconds}s`
            );

        msg.reply({ embeds: [embed] }).catch(() => {});
    }
};