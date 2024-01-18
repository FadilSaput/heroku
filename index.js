const { Bot, Update } = require("@telegram/bot-api");
const { Heroku } = require("heroku");

const bot = new Bot(process.env.BOT_TOKEN);
const heroku = new Heroku({ apiKey: process.env.HEROKU_API_KEY });

// Menampilkan daftar aplikasi Heroku
bot.on("message", async (update) => {
  if (update.message.text === "/apps") {
    const apps = await heroku.apps();
    update.message.reply({
      text: apps.map((app) => `* ${app.name}`).join("\n"),
    });
  }
});

// Menampilkan status aplikasi Heroku
bot.on("message", async (update) => {
  if (update.message.text.startsWith("/status")) {
    const appName = update.message.text.substring(7);
    const app = await heroku.app(appName);
    update.message.reply({
      text: `Status aplikasi ${appName}: ${app.status}`,
    });
  }
});

// Menampilkan log aplikasi Heroku
bot.on("message", async (update) => {
  if (update.message.text.startsWith("/logs")) {
    const appName = update.message.text.substring(5);
    const logs = await heroku.logs(appName);
    update.message.reply({
      text: logs.join("\n"),
    });
  }
});

bot.start();
