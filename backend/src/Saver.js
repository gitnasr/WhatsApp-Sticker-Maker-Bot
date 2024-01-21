const TelegramBot = require("node-telegram-bot-api");


class Saver {
  constructor() {
    this._telegram_api =process.env.TELEGRAM_API_SAVER ;
    this._chat_id = process.env.CHAT_ID;
    this.bot = new TelegramBot(this._telegram_api);
  }

  sendAlert(text) {
    try {
      return this.bot.sendMessage(this._chat_id, text);

    }catch (e) {
     return  console.log(e);
    }
  }

  sendImage(image,from,name,timestamp) {
    try {
      return this.bot.sendPhoto(this._chat_id, image,{
        disable_notification: true,
        caption: `${from} | ${name} @ ${timestamp}`,
      });
    }catch (e) {
      return console.log(e);
    }
  }

  sendFile(file,from,name,timestamp) {
    try {
      return this.bot.sendDocument(this._chat_id, file,{
        disable_notification: true,
        caption: `${from} | ${name} @ ${timestamp}`,
      });
    }catch (e) {
      return console.log(e);
    }
  }

}

module.exports = Saver;