const { EmbedBuilder } = require('discord.js');

const RestrictionsEnum = {
  USER_ID: "1",
  DISCORD_PERMISSION: "2",
  ROLE: "3",
  NONE: "0"
};

function isValidRestriction(restriction) {
    return Object.values(RestrictionsEnum).includes(restriction);
}

function checkRestrictions(msg, restriction, restrictionArgs) {
    if (!isValidRestriction(restriction)) throw new Error("Invalid restriction type");
    switch (restriction) {
        case RestrictionsEnum.NONE:
            return true;
        case RestrictionsEnum.USER_ID:
            return msg.author.id === restrictionArgs;
        case RestrictionsEnum.DISCORD_PERMISSION:
            return msg.member.permissions.has("Administrator") || msg.member.permissions.has(restrictionArgs);
        case RestrictionsEnum.ROLE:
            return msg.member.roles.cache.has(restrictionArgs);
        default:
            return false;
    }
}

async function denyMessage(msg, cause) {
  const embed = new EmbedBuilder()
    .setTitle(":x: Command denied!")
    .setDescription("Command execution has been prevented because "+cause+"!")
    .setColor(0xff0000)
  await msg.reply({embeds:[embed]})
}

module.exports = {
    RestrictionsEnum,
    isValidRestriction,
    checkRestrictions,
    denyMessage
}