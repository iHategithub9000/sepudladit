const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { exec } = require("child_process");
const { promisify } = require("util");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const execAsync = promisify(exec);


module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "uptime",
    help_string: "- shows bot uptime",
    run: async (msg, argv, cl) => {
        const uptime = cl.uptime;
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        msg.reply(`## :clock1: Uptime\n Bot has been running for ${hours}h ${minutes}m ${seconds}s`).catch(() => {});
    }
}