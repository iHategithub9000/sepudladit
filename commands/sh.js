const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "sh",
    help_string: "<command> - Executes a shell command. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        const command = argv.slice(1).join(" ");

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: Shell command execution failed.")
                    .setDescription(`\`\`\`${stderr || error.message}\`\`\``)
                    .setColor(0xff0000);

                return msg.reply({ embeds: [embed] });
            }

            const embed = new EmbedBuilder()
                .setTitle(":white_check_mark: Shell command executed.")
                .setDescription(`\`\`\`${stdout || "No output"}\`\`\``)
                .setColor(0x00ff00);

            msg.reply({ embeds: [embed] });
        });
    }
};