const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const play = require("play-dl");

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.Connect,

    name: "play",
    help_string: "<url/file/search> - Plays audio",

    run: async (msg, argv) => {
        const query = argv.slice(1).join(" ");
        const vc = msg.member.voice.channel;

        if (!vc) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("You need to join a voice channel first!")
                .setColor("#FF0000");
            return msg.reply({ embeds: [embed] });
        }

        if (!query && msg.attachments.size === 0) {
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("Please provide a link, a file, or a search query!")
                .setColor("#FF0000");
            return msg.reply({ embeds: [embed] });
        }

        let stream;
        let trackTitle = "Unknown Track";

        try {
            // 🎧 Attachment (mp3, wav, etc.)
            if (msg.attachments.size > 0) {
                const file = msg.attachments.first().url;
                stream = await play.stream(file);
                trackTitle = msg.attachments.first().name;
            }

            // 🔗 YouTube URL
            else if (play.yt_validate(query) === "video") {
                stream = await play.stream(query);
                const info = await play.video_info(query);
                trackTitle = info.video_details.title;
            }

            // 🔗 Spotify URL
            else if (play.sp_validate(query) === "track") {
                const info = await play.spotify(query);
                const yt = await play.search(info.name, { limit: 1 });
                stream = await play.stream(yt[0].url);
                trackTitle = yt[0].title;
            }

            // 🔗 SoundCloud URL
            else if (query.includes("soundcloud.com")) {
                stream = await play.stream(query);
                trackTitle = query.split("/").pop();
            }

            // 🔍 Search fallback (YouTube)
            else {
                const results = await play.search(query, { limit: 1 });
                if (!results.length) {
                    const embed = new EmbedBuilder()
                        .setTitle("No Results")
                        .setDescription(`No track found for: **${query}**`)
                        .setColor("Orange");
                    return msg.reply({ embeds: [embed] });
                }
                stream = await play.stream(results[0].url);
                trackTitle = results[0].title;
            }

            const connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: msg.guild.id,
                adapterCreator: msg.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
            });

            player.play(resource);
            connection.subscribe(player);

            // Notify user with embed
            const embed = new EmbedBuilder()
                .setTitle("Now Playing 🎶")
                .setDescription(`**${trackTitle}**`)
                .setColor("#00FF00");
            msg.reply({ embeds: [embed] });

            // Cleanup connection when finished
            player.on(AudioPlayerStatus.Idle, () => connection.destroy());

        } catch (err) {
            console.error(err);
            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("Failed to play track")
                .setColor("#FF0000");
            msg.reply({ embeds: [embed] });
        }
    }
};
