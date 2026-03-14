const { 
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');
const fs = require('fs');
const AR = require("./commandAccessRestrictions.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(require("./prefix.json"))) return;
  const argv = message.content.split(" ");
  const command = argv[0].toLowerCase();
  const commands = [];
  for (const file of fs.readdirSync("./commands").filter(file => file.endsWith(".js"))) {
    const command = require(`./commands/${file}`);
    commands.push(command);
  }
  if (command === require("./prefix.json")+"help") {
    const embed = new EmbedBuilder()
    .setTitle("Available commands")
    .setDescription(commands.map(cmd => `${require("./prefix.json")}${cmd.name} ${cmd.help_string}`).join("\n"))
    .setColor(0x00ff00)
    await message.reply({embeds:[embed]})
    return;
  }
  const commandData = commands.find(cmd => cmd.name === command.slice(require("./prefix.json").length));
  if (!commandData) return;
  if (commandData.accessRestriction) {
    if (!AR.checkRestrictions(message, commandData.accessRestriction, commandData.accessRestrictionArgs)) {
      if (commandData.accessRestriction === AR.RestrictionsEnum.USER_ID) {
        await AR.denyMessage(message, `you are not <@${commandData.accessRestrictionArgs}>`);
      } else if (commandData.accessRestriction === AR.RestrictionsEnum.ROLE) {
        await AR.denyMessage(message, `you do not have the role <@&${commandData.accessRestrictionArgs}>`);
      } else if (commandData.accessRestriction === AR.RestrictionsEnum.DISCORD_PERMISSION) {
        await AR.denyMessage(message, `you do not have the permission \`${commandData.accessRestrictionArgs}\``);
      }
      return;
    }
  }
  await commandData.run(message, argv, client);
});

for (const file of fs.readdirSync("./events").filter(file => file.endsWith(".js"))) {
  const event = require(`./events/${file}`);
  if (event.runOnce) {
    client.once(event.type, (...args) => event.run(...args, client));
  } else {
    client.on(event.type, (...args) => event.run(...args, client));
  }
}

client.login(fs.readFileSync("DO_NOT_REVEAL__TOKEN.txt", "utf8").trim());