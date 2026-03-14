const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { exec } = require("child_process");
const { promisify } = require("util");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const execAsync = promisify(exec);

async function pingGoogle() {
  try {
    const countFlag = process.platform === "win32" ? "-n 1" : "-c 1";
    const { stdout } = await execAsync(`ping ${countFlag} google.com`);

    const match = stdout.match(/time[=<]\s*(\d+\.?\d*)\s*ms/i);
    if (match) return parseFloat(match[1]);

    throw new Error("Could not parse ping time");
  } catch (err) {
    console.error("Ping failed:", err);
    return null;
  }
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "ping",
    help_string: "- shows ping",
    run: async (msg, argv, cl) => {
        msg.reply("## :ping_pong: pong!\n discord gateway ping: " + cl.ws.ping + "ms\n google ping: "+await pingGoogle()+"ms").catch(() => {});
    }
}