const QRCode = require("qr-image");
const { Client, LocalAuth } = require("whatsapp-web.js");
const Saver = require("./Saver");
const Logger = require("./Logger");
const Utils = require("./utils");

class WhatsApp {
	constructor() {
		this.Saver = new Saver();
		this.Logs = new Logger();

		const client = new Client({
			puppeteer: {
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-dev-shm-usage",
					"--disable-accelerated-2d-canvas",
					"--no-first-run",
					"--single-process",
					"--disable-gpu",
				],
			},
			authStrategy: new LocalAuth({
				clientId: process.env.NODE_ENV === "production" ? "BTA" : "DEV",
			}),
		});

		client.initialize();

		client.on("qr", (qr) => {
			const QR = QRCode.imageSync(qr, { type: "png" });
			this.Saver.sendImage(QR, "Server", "QR Code");
		});

		client.on("ready", () => {
			this.Logs.sendAlert(
				`✔ WhatsAppStickerMakerBot: Ready ${Utils.currentTime()}`
			);
			client.sendPresenceUnavailable();
			client.getChats().then((chats) => {
				chats.forEach((chat) => {
					if (chat.unreadCount > 0) {
						// process unread messages
						chat.fetchMessages({ limit: chat.unreadCount }).then((messages) => {
							messages.forEach(async (message) => {
								if (!message.hasMedia) {
									return;
								}
								const media = message.downloadMedia();
							

								if (message.hasMedia && message.type === "image") {
									await this._sendSticker(message.from, media);
									await this._aboutMessage(message.from);
								}
							});
						});
					}
				});
			});
		});
		client.on("change_state", (state) => {
			this.Logs.sendAlert(
				`⚙ WhatsAppStickerMakerBot: ${state} ${Utils.currentTime()}`
			);
		});
		client.on("disconnected", (state) => {
			this.Logs.sendAlert(
				`⚠ WhatsAppStickerMakerBot: Disconnected ${Utils.currentTime()}`
			);
		});
		client.on("auth_failure", (state) => {
			this.Logs.sendAlert(
				`⚠ WhatsAppStickerMakerBot: Authentication Failed ${Utils.currentTime()}`
			);
		});
		client.on("authenticated", () => {
			this.Logs.sendAlert(
				`🚀 WhatsAppStickerMakerBot: Authenticated ${Utils.currentTime()}`
			);
		});
		client.on("call", async (call) => {
			await call.reject();
			const chat = call.from;
			const Blocked =
				"We are sorry to inform you that we have blocked you from using this bot due to spamming.";
			await client.sendMessage(chat, Blocked);
			const Contact = await client.getContactById(chat);
			Contact.block();
			this.Logs.sendAlert(
				`WhatsAppStickerMakerBot: Blocked a new Contact ${JSON.stringify(
					Contact
				)}`
			);
		});
		this.client = client;
		this._handleIncomingMessages();
	}
	async CheckClientStatus() {
		const status = await this.client.getState();
		if (status !== "CONNECTED" && status !== null) {
			this.Logs.sendAlert(
				`⚠ WhatsApp Watcher: Client Status ${status} ${Utils.currentTime()}`
			);
			await this.client.resetState();
			this.Logs.sendAlert(
				`⚠ WhatsApp Watcher: Client Restarted ${Utils.currentTime()}`
			);
		}
		return status;
	}

	_sendTextMessage(number, message) {
		const client = this.client;
		client.sendMessage(number, message);
	}
	async _handleIncomingMessages() {
		const client = this.client;
		client.on("message", async (message) => {
			try {
				if (message.body === ".") {
					return this._sendTextMessage(
						message.from,
						"Send GIF or Image to Get Started"
					);
				}

				if (message.hasMedia) {
					const media = await message.downloadMedia();
					const chat = await message.getChat();
					
					if (message.type === "image") {
						// make sure that about and processing message is sent only once for multiple images
						this._sendTextMessage(message.from, "Processing your image...");
						await this._sendSticker(message.from, media);
						await this._aboutMessage(message.from);
						await chat.archive();
					} else {
						return this._sendTextMessage(
							message.from,
							"Sorry, I only accept images or GIFs."
						);
					}
				}
			} catch (error) {
				console.log(error);
				await this.Logs.sendAlert(
					`⚠ WhatsAppStickerMakerBot \n Error While Processing ${Utils.currentTime()} \n ${Utils.errorsAsStrings(
						error
					)}`
				);
			}
		});
	}

	async _sendSticker(number, image) {
		try {
			const client = this.client;
			await client.sendMessage(number, image, {
				sendMediaAsSticker: true,
				sendSeen: true,
				stickerAuthor: "WhatsApp Sticker Maker Bot",
				stickerName: "+201272340825",
			});
		} catch (error) {
			console.log(error);
			await this.Logs.sendAlert(
				`⚠ WhatsAppStickerMakerBot \n Error While Processing Sticker ${Utils.currentTime()} \n ${Utils.errorsAsStrings(
					error
				)}`
			);
		}
	}
	async _aboutMessage(number) {
		const client = this.client;
		await client.sendMessage(
			number,
			"Thank you for using our service! \n don't forget to subscribe https://t.me/gitnasr"
		);
	}
}

module.exports = WhatsApp;
