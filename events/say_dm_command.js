module.exports = {
  type: "messageCreate",
  runOnce: false,
  run: async (message,client) => {
    console.log("DM EVENT FIRED");
    // Ignore bots
    if (message.author.bot) return;

    // Check if DM
    if (!message.guild) {
        // Check user ID
        if (message.author.id !== "836012649959522384") return;

        // Check if message starts with "send"
        if (!message.content.startsWith("send")) return;

        // Split by semicolons
        const parts = message.content.split(";");

        // Expected: ["send", "<channel id>", "...message text"]
        const [command, channelId, ...messageParts] = parts;

        const finalMessage = messageParts.join(";"); // in case message has semicolons

        console.log(command);      // "send"
        console.log(channelId);    // channel ID
        console.log(finalMessage); // message text

        try {
            const channel = await client.channels.fetch(channelId.trim());

            if (!channel) return message.reply("Channel not found.");

            await channel.send(finalMessage.trim());
            await message.reply("Sent ✅");
        } catch (err) {
            console.error(err);
            message.reply("Error sending message.");
        }
    }
  }
};
