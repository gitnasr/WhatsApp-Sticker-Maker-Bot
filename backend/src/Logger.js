const Saver = require("./Saver");
const TelegramBot = require("node-telegram-bot-api");

class Logger extends Saver {
    constructor() {
		super();
		this._telegram_api = process.env.TELEGRAM_API_LOGGER;
		this._chat_id = process.env.CHAT_ID;
		this.bot = new TelegramBot(this._telegram_api);
	}
   
}

module.exports = Logger;