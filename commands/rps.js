const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

function isWin(choice1, choice2) {
    if (choice1 === choice2) return false; // tie
    const beats = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
        gun: ["rock", "scissors"],
        "nuclear_bomb": ["rock", "paper", "scissors", "gun"],
        "black_hole": ["rock", "paper", "scissors", "gun", "nuclear_bomb"]
    };
    return beats[choice1]?.includes(choice2) || false;
}


module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "rps",
    help_string: "<choice> - Plays rock, paper, scissors with the bot.",
    run: async (msg, argv, cl) => {
        if (argv.length < 2) {
            msg.reply("Please specify your choice (rock, paper, or scissors).");
            return;
        }
        if (!["rock", "paper", "scissors", "gun", "nuclear_bomb", "black_hole"].includes(argv[1])) {
            msg.reply("Please specify a valid choice (rock, paper, or scissors).");
            return;
        }

        const botChoice = ["rock", "paper", "scissors", "gun", "nuclear_bomb", "black_hole"][Math.floor(Math.random() * 6)];
        const isPlayerWin = isWin(argv[1], botChoice);
        const isTie = argv[1] === botChoice;


        const embed = new EmbedBuilder()
            .setTitle("RPS")
            .setDescription(`You chose ${argv[1]}. The bot chose ${botChoice}. ${isTie ? "It's a tie!" : isPlayerWin ? "You win!" : "The bot wins!"}`)
            .setColor(0x00ff00)
        msg.reply({ embeds: [embed] });
    }
}