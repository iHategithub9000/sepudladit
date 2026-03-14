const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

async function getRandomRedditImage(subreddit) {
  try {
    const fetch = (await import("node-fetch")).default; // dynamic import for ESM

    const res = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`);
    const data = await res.json();

    const posts = data.data.children.filter(
      post => post.data.post_hint === "image" && post.data.url
    );

    if (!posts.length) return null;

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    return randomPost.data.url;
  } catch (err) {
    console.error("Failed to fetch Reddit image:", err);
    return null;
  }
}



module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "techgore",
    help_string: "- shows a random techgore image",
    run: async (msg, argv, cl) => {
        msg.channel.sendTyping().catch(() => {});
        const img = await getRandomRedditImage(Math.random() < 0.5 ? "hardwaregore" : "softwaregore");
        if (img) {
            msg.reply(img).catch(() => {});
        } else {
            msg.reply("Failed to fetch a tech gore image.").catch(() => {});
        }
    }
}