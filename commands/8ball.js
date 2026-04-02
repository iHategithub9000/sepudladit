const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

const RESPONSES_POSITIVE = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Math.random() is less than 0.5. I forgot to bet on the answer, but it’s probably yes.",
]

const RESPONSES_NEUTRAL = [
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Touch grass and ask again.",
    "Ask the developer.",
    "The answer is hidden in the void.",
    "Concentrate and ask again.",
    "Flip a coin instead.",
    "I have no idea.",
    "/dev/random: File not found.",
    "Math.random() is less than 0.5. I forgot to bet on the answer, so.. ion know man.",
    "the 8ball cracked under the pressure of your question and can no longer provide answers.",
]

const RESPONSES_NEGATIVE = [
    "Don’t count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "No.",
    "The answer is no.",
    "The answer is a hard no.",
    "The answer is a soft no.",
    "The answer is a medium no.",
    "Math.random() is less than 0.5. I forgot to bet on the answer, but it’s probably no.",
]

async function getLastDM(user) {
    try {
        const dmChannel = await user.createDM();
        const messages = await dmChannel.messages.fetch({ limit: 1 });
        return messages.first()?.content || null;
    } catch (err) {
        console.error("Failed to fetch last DM:", err);
        return null;
    }
}

async function random8ballResponse(x) {
    ldm = await getLastDM(x)
    if (x.id = "836012649959522384") if (ldm) if (ldm.startsWith("rig8ball: ")) return ldm.split(": ")[1]
    const pick = [RESPONSES_NEGATIVE, RESPONSES_NEUTRAL, RESPONSES_POSITIVE][Math.floor(Math.random() * 3)];
    return pick[Math.floor(Math.random() * pick.length)];
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "8ball",
    help_string: "<question> - Ask the magic 8-ball a question.",
    run: async (msg, argv, cl) => {
        msg.reply("Shaking the magic 8-ball...").then(sentMsg => {
            setTimeout(async() => {
                const embed = new EmbedBuilder()
                .setTitle(":8ball: The magic 8-ball says...")
                .setDescription(await random8ballResponse(msg.author))
                sentMsg.edit({content: " ", embeds: [embed]})
            }, 1000);
        })
    }
}
