const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

function toSmallCaps(text) {
  const map = {
    a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ",
    f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
    k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ",
    p: "ᴘ", q: "ꞯ", r: "ʀ", s: "s", t: "ᴛ",
    u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ",
    z: "ᴢ"
  };

  return text
    .toLowerCase()
    .split("")
    .map(char => map[char] || char)
    .join("");
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "smallcaps",
    help_string: "<string> - smallcapsifies string. pretty!",
    run: async (msg, argv, cl) => {
        msg.reply(toSmallCaps(argv.slice(1).join("")))
    }
}
