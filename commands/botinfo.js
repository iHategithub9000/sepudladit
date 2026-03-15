const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "botinfo",
    help_string: "- shows bot information",
    run: async (msg, argv, cl) => {
        pkg = require("../package.json")
        let specs = {
              hostname: os.hostname(),
              platform: os.platform(),
              arch: os.arch(),
              release: os.release(),
              uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
              totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
              freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
              cpuCount: os.cpus().length,
              cpuModel: os.cpus()[0].model,
              cpuSpeed: `${os.cpus()[0].speed} MHz`,
              version: os.version()
            };
        const allDeps = { 
          ...pkg.dependencies, 
          ...pkg.devDependencies 
        };
        let depString = "";
        for (const [name, version] of Object.entries(allDeps)) {
          depString += `${name} version: ${version}\n`
        }
        depString += `${pkg.name} version: ${pkg.version}\n`
        msg.reply(`# :computer: Bot Info\nAPI Heartbeat: ${cl.ws.ping}ms\nHostname: ${specs.hostname}\nPlatform: ${specs.platform}\nArchitecture: ${specs.arch}\nRelease: ${specs.release}\nUptime: ${specs.uptime}\nMemory: total ${specs.totalMemory}, free ${specs.freeMemory}\nCPU Speed: ${specs.cpuSpeed}\nCPU Count: ${specs.cpuCount}\nCPU Model: ${specs.cpuModel}\nOS Version: ${specs.version}\nNode version: ${process.version}\n${depString}`) 
    }
}
